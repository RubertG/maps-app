import { useReducer } from "react"
import { Map, Marker, Popup } from "mapbox-gl"
import { mapReducer } from "./mapReducer"
import { MapContext } from "./MapContext"

export interface MapState {
  isMapReady: boolean
  map?: Map
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined
}

const MapProvider = ({
  children
}: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)

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
