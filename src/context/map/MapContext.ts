import { Map } from "mapbox-gl"
import { createContext } from "react"
import { MapState } from "./MapProvider"

interface MapContextProps extends MapState{
  setMap: (map: Map) => void
  getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps)