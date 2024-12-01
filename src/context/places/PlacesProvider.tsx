import { useEffect, useReducer } from "react"
import { placesReducer } from "./placesReducer"
import { PlacesContext } from "./PlacesContext"
import { getUserLocation } from "../../helpers/getUserLocation"
import { searchApi } from "../../apis"
import { Feature, PlacesResponse } from "../../interfaces/apiTypes"

interface Props {
  children: React.ReactNode
}

export interface PlacesState {
  isLoading: boolean,
  userLocation?: [number, number]
  activePlaceId: string

  isLoadingPlaces: boolean
  places: Feature[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  activePlaceId: '',
  places: [],
  isLoadingPlaces: false
}

export const PlacesProvider = ({
  children
}: Props) => {
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

  return (
    <PlacesContext.Provider value={{
      ...state,
      searchPlacesByQuery,
      setActivePlaceId
    }}>
      {children}
    </PlacesContext.Provider>
  )
}
