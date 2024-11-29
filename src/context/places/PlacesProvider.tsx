import { useEffect, useReducer } from "react"
import { placesReducer } from "./placesReducer"
import { PlacesContext } from "./PlacesContext"
import { getUserLocation } from "../../helpers/getUserLocation"

interface Props {
  children: React.ReactNode
}

export interface PlacesState {
  isLoading: boolean,
  userLocation?: [number, number]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined
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

  return (
    <PlacesContext.Provider value={{
      ...state
    }}>
      {children}
    </PlacesContext.Provider>
  )
}
