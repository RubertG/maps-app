import { createContext } from "react"
import { Feature } from "../../interfaces/apiTypes"

export interface PlacesContextProps {
  isLoading: boolean
  userLocation?: [number, number]
  places: Feature[]
  isLoadingPlaces: boolean
  activePlaceId: string

  setActivePlaceId: (id: string) => void
  searchPlacesByQuery: (query: string) => Promise<Feature[]>
}

export const PlacesContext = createContext<PlacesContextProps>({
  isLoading: true,
  userLocation: undefined,
  places: [],
  isLoadingPlaces: false,
  activePlaceId: '',
  
  setActivePlaceId: () => {},
  searchPlacesByQuery: () => Promise.resolve([])
})