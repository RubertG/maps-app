import { Map, Marker } from "mapbox-gl"
import { MapState } from "./MapProvider"

type MapAction = { action: 'setMap', payload: Map }
                | { action: 'setMarkers', payload: Marker[] }
                | { action: 'setRoute', payload: { distance: number, duration: number } | undefined }
                

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  if (action.action === 'setMap') return {
    ...state,
    isMapReady: true,
    map: action.payload
  }

  if (action.action === 'setMarkers') return {
    ...state,
    markers: action.payload
  }

  if (action.action === 'setRoute') return {
    ...state,
    route: action.payload
  }

  return state
}