import { ChangeEvent, useContext, useRef } from "react"
import { MapContext, PlacesContext } from "../context"
import { SearchResults } from "./SearchResults"
import { SearchItem } from "./SearchItem"
import { LoadingPlaces } from "./LoadingPlaces"
import { Feature } from "../interfaces/apiTypes"

const SearchBar = () => {
  const { searchPlacesByQuery, places, isLoadingPlaces, setActivePlaceId, activePlaceId } = useContext(PlacesContext)
  const { map } = useContext(MapContext)
  const debounceRef = useRef<NodeJS.Timeout>()

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
              onClick={() => onPlaceClick(place)}
            />
          ))
        }
      </SearchResults>
    </section>
  )
}

export { SearchBar }
