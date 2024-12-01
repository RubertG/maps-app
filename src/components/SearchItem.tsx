import { Properties } from "../interfaces/apiTypes"

interface Props {
  onClick: () => void
  active?: boolean
  properties: Properties
}

const SearchItem = ({
  properties, onClick, active = false
}: Props) => {

  return (
    <li className={`p-3 border-b border-zinc-300 hover:bg-zinc-100 ${active && 'bg-zinc-100'} last:border-b-0`}>
      <h3 className="font-bold text-zinc-900">{properties.name}</h3>
      <p className="text-zinc-700 text-xs mt-1">{properties.full_address}</p>

      <button
        className="px-3 py-1.5 border border-zinc-900 hover:bg-zinc-900 transition-colors text-zinc-800 hover:text-white rounded-lg text-xs mt-2"
        onClick={onClick}
      >
        Direcciones
      </button>
    </li>
  )
}

export { SearchItem }
