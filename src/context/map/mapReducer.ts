import { Map } from "mapbox-gl"
import { MapState } from "./MapProvider"

type MapAction = { action: 'setMap', payload: Map }

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  if (action.action === 'setMap') return {
    ...state,
    isMapReady: true,
    map: action.payload
  }

  return state
}