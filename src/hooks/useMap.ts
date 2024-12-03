import { useContext, useEffect, useReducer } from "react"
import { mapReducer } from "../context/map/mapReducer"
import { MapState } from "../context/map/MapProvider"
import { PlacesContext } from "../context"
import { LngLatBounds, Map, Marker, Popup, SourceSpecification } from "mapbox-gl"
import { directionsApi } from "../apis"
import { DirectionsAPI } from "../interfaces/directionsApiTypes"


const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  route: undefined
}

export const useMap = () => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
  const { places } = useContext(PlacesContext)

  useEffect(() => {
    if (places.length === 0) {
      state.markers.forEach(marker => marker.remove())
      dispatch({ action: 'setMarkers', payload: [] })
      dispatch({ action: 'setRoute', payload: undefined })
      state.map?.removeLayer('route')
      state.map?.removeSource('route')

      return
    }

    state.markers.forEach(marker => marker.remove())
    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates

      const popup = new Popup().setHTML(`
        <h6 class="text-lg font-bold">${place.properties.name}</h6>
        <p class="text-xs text-zinc-700">${place.properties.full_address}</p>
      `)

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map!)

      newMarkers.push(newMarker)
    }

    dispatch({ action: 'setMarkers', payload: newMarkers })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places])

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup()
      .setHTML(`
      <h3 class="text-lg font-bold">Mi ubicación</h3>
    `)

    new Marker({
      color: 'red'
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map)

    dispatch({ action: 'setMap', payload: map })
  }

  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const res = await directionsApi.get<DirectionsAPI>(`/${start.join(',')};${end.join(',')}`)

    if (res.data.routes.length === 0) {
      throw new Error('No hay ruta entre esos puntos')
    }

    const { distance, duration, geometry } = res.data.routes[0]
    let kms = distance / 1000
    kms = Math.round(kms * 100)
    kms /= 100
    const minutes = Math.floor(duration / 60)
    console.log({ km: kms, minutes })

    const bounces = new LngLatBounds(
      start,
      start
    )

    for (const point of geometry.coordinates) {
      const [lng, lat] = point
      bounces.extend([lng, lat])
    }

    state.map?.fitBounds(bounces, {
      padding: 150
    })

    // Polyline
    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geometry.coordinates
            }
          }
        ]
      }
    }

    if (state.map?.getLayer('route')) {
      state.map.removeLayer('route')
      state.map.removeSource('route')
    }

    state.map?.addSource('route', sourceData)
    state.map?.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#18181b',
        'line-width': 4
      }
    })

    dispatch({ action: 'setRoute', payload: { distance: kms, duration: minutes } })
  }

  return {
    ...state,
    setMap,
    getRouteBetweenPoints
  }
}