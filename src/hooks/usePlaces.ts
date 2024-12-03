import { useEffect, useReducer } from "react"
import { PlacesState } from "../context"
import { searchApi } from "../apis"
import { placesReducer } from "../context/places/placesReducer"
import { getUserLocation } from "../helpers"
import { PlacesResponse } from "../interfaces/apiTypes"

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  activePlaceId: '',
  places: [],
  isLoadingPlaces: false
}

export const usePlaces = () => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocation()
      .then(coords => {
        dispatch({ type: 'setUserLocation', payload: coords })
      })
      .catch(err => console.log(err))
      .finally(() => {
        dispatch({ type: 'setLoading', payload: false })
      })
  }, [])

  const searchPlacesByQuery = async (query: string) => {
    if (query.length === 0) {
      dispatch({ type: 'setPlaces', payload: [] })
    
      return []
    }

    if (!state.userLocation) throw new Error('No hay ubicación del usuario')

    dispatch({ type: 'setLoadingPlaces', payload: true })

    const response = await searchApi.get<PlacesResponse>('', {
      params: {
        proximity: state.userLocation.join(','),
        q: query
      }
    })

    dispatch({ type: 'setPlaces', payload: response.data.features })

    return response.data.features
  }

  const setActivePlaceId = (id: string) => dispatch({ type: 'setActivePlaceId', payload: id })

  return {
    ...state,
    searchPlacesByQuery,
    setActivePlaceId
  } 

}