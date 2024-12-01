import { useContext, useEffect, useReducer } from "react"
import { Map, Marker, Popup } from "mapbox-gl"
import { mapReducer } from "./mapReducer"
import { MapContext } from "./MapContext"
import { PlacesContext } from "../places/PlacesContext"

export interface MapState {
  isMapReady: boolean
  map?: Map

  markers: Marker[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []
}

const MapProvider = ({
  children
}: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
  const { places } = useContext(PlacesContext)

  useEffect(() => {
    if (places.length === 0) {
      state.markers.forEach(marker => marker.remove())
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

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export { MapProvider }
