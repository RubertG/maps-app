import { Map, Marker } from "mapbox-gl"
import { MapContext } from "./MapContext"
import { useMap } from "../../hooks"

export interface MapState {
  isMapReady: boolean
  map?: Map
  route?: {
    distance: number
    duration: number
  }

  markers: Marker[]
}

const MapProvider = ({
  children
}: React.PropsWithChildren) => {
  const contextValue = useMap()

  return (
    <MapContext.Provider
      value={contextValue}
    >
      {children}
    </MapContext.Provider>
  )
}

export { MapProvider }
