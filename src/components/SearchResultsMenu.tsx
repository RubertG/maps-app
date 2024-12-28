import { useState } from "react"

interface Props {
  children: React.ReactNode
  existPlaces: boolean
}

const SearchResultsMenu = ({
  children,
  existPlaces
}: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`relative mt-2 ${open ? "translate-x-0" : "-translate-x-[108%]"} transition-transform`}>
      {
        existPlaces && (
          <button
            className={`absolute top-0 p-2 rounded-lg bg-white border border-zinc-300 shadow-lg ${open ? "-right-[50px]" : "-right-[60px]"} transition-all`}
            onClick={() => setOpen(!open)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-sidebar-left-collapse stroke-zinc-800"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M9 4v16" /><path d="M15 10l-2 2l2 2" /></svg>
          </button>
        )
      }
      {children}
    </div>
  )
}

export { SearchResultsMenu }
