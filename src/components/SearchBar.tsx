import { ChangeEvent, useContext, useRef } from "react"
import { MapContext, PlacesContext } from "../context"
import { SearchResults } from "./SearchResults"
import { SearchItem } from "./SearchItem"
import { LoadingPlaces } from "./LoadingPlaces"
import { Feature } from "../interfaces/apiTypes"

const SearchBar = () => {
  const { searchPlacesByQuery, places, isLoadingPlaces, setActivePlaceId, activePlaceId, userLocation } = useContext(PlacesContext)
  const { map, getRouteBetweenPoints, route } = useContext(MapContext)
  const debounceRef = useRef<number | null>()

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchPlacesByQuery(event.target.value)
    }, 300)
  }

  const onPlaceClick = (place: Feature) => {
    const [lng, lat] = place.geometry.coordinates
    map?.flyTo({ center: [lng, lat], zoom: 16 })
    setActivePlaceId(place.id)
  }

  const getRoute = (place: Feature) => {
    if (!map || !userLocation) return

    const [lng, lat] = place.geometry.coordinates

    getRouteBetweenPoints(userLocation, [lng, lat])
  }

  return (
    <section className="fixed top-4 left-4 w-full max-w-64">
      <input
        className="block w-full text-black bg-white border border-zinc-300 text-sm rounded-lg shadow-lg px-3 py-1.5"
        type="text"
        placeholder="Buscar lugar..."
        onChange={onQueryChange}
      />

      <SearchResults
        isLoadingPlaces={isLoadingPlaces}
        places={places}
        onLoadingPlaces={() => <LoadingPlaces />}
      >
        {
          (places) => places.map((place) => (
            <SearchItem
              key={place.id}
              active={activePlaceId === place.id}
              properties={place.properties}
            >
              <footer className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1.5 border border-zinc-900 hover:bg-zinc-900 transition-colors text-zinc-800 hover:text-white rounded-lg text-xs"
                  onClick={() => getRoute(place)}
                >
                  Ruta
                </button>
                <button
                  className="px-3 py-1.5 border border-zinc-900 bg-zinc-900 hover:bg-zinc-700 transition-colors text-white rounded-lg text-xs"
                  onClick={() => onPlaceClick(place)}
                >
                  Ir
                </button>
              </footer>
            </SearchItem>
          ))
        }
      </SearchResults>

      {
        route && (
          <footer className="text-black bg-white border mt-2 border-zinc-300 text-sm rounded-lg shadow-lg px-3 py-1.5">
            <h2 className="font-bold">Información</h2>
            <p className="text-zinc-900">{route.distance} kilometros - {route.duration} minutos</p>
          </footer>
        )
      }
    </section>
  )
}

export { SearchBar }
