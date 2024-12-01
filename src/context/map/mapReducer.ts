import { Map, Marker } from "mapbox-gl"
import { MapState } from "./MapProvider"

type MapAction = { action: 'setMap', payload: Map }
                | { action: 'setMarkers', payload: Marker[] }

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

  return state
}