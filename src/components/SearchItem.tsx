import { Properties } from "../interfaces/apiTypes"

interface Props {
  children?: React.ReactNode
  active?: boolean
  properties: Properties
}

const SearchItem = ({
  properties, active = false, children
}: Props) => {

  return (
    <li className={`p-3 border-b border-zinc-300 hover:bg-zinc-100 ${active && 'bg-zinc-100'} last:border-b-0`}>
      <h3 className="font-bold text-zinc-900">{properties.name}</h3>
      <p className="text-zinc-700 text-xs mt-1">{properties.full_address}</p>

      {children}
    </li>
  )
}

export { SearchItem }
