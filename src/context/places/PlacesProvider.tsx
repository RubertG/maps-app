import { PlacesContext } from "./PlacesContext"
import { Feature } from "../../interfaces/apiTypes"
import { usePlaces } from "../../hooks"

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

export const PlacesProvider = ({
  children
}: Props) => {
  const contextValue = usePlaces()
  
  return (
    <PlacesContext.Provider value={contextValue}>
      {children}
    </PlacesContext.Provider>
  )
}
