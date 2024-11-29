import { PlacesState } from "./PlacesProvider"

export type PlacesAction =
  { type: 'setUserLocation', payload: [number, number] }
  | { type: 'setLoading', payload: boolean }

export const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case 'setUserLocation': return {
      ...state,
      userLocation: action.payload
    }

    case 'setLoading': return {
      ...state,
      isLoading: action.payload
    }

    default: return state
  }
}