import { Feature } from "../../interfaces/apiTypes"
import { PlacesState } from "./PlacesProvider"

export type PlacesAction =
  { type: 'setUserLocation', payload: [number, number] }
  | { type: 'setLoading', payload: boolean }
  | { type: 'setLoadingPlaces', payload: boolean }
  | { type: 'setPlaces', payload: Feature[] }
  | { type: 'setActivePlaceId', payload: string }

export const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case 'setUserLocation': return {
      ...state,
      isLoading: false,
      userLocation: action.payload
    }

    case 'setLoading': return {
      ...state,
      isLoading: action.payload
    }

    case 'setLoadingPlaces': return {
      ...state,
      isLoadingPlaces: action.payload
    }

    case 'setPlaces': return {
      ...state,
      isLoadingPlaces: false,
      places: action.payload
    }

    case 'setActivePlaceId': return {
      ...state,
      activePlaceId: action.payload
    }

    default: return state
  }
}