import { Feature } from "../interfaces/apiTypes"

interface Props {
  isLoadingPlaces: boolean
  places: Feature[]

  children: (places: Feature[]) => React.ReactNode
  onLoadingPlaces?: () => React.ReactNode
}

const SearchResults = ({
  children, isLoadingPlaces, places, onLoadingPlaces
}: Props) => {
  if (places.length === 0 && !isLoadingPlaces) return null

  return (
    <ul
      className={`grid grid-cols-1 bg-white border border-zinc-300 rounded-lg overflow-hidden mt-2 max-h-[87vh] overflow-y-scroll scrollbar-none`}
    >
      {isLoadingPlaces && onLoadingPlaces?.()}
      {!isLoadingPlaces && children(places)}
    </ul>
  )
}

export { SearchResults }
