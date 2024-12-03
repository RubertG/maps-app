import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"

const BtnMyLocation = () => {
  const { isMapReady, map } = useContext(MapContext)
  const { userLocation, setActivePlaceId } = useContext(PlacesContext)

  const onClick = () => {
    if (!isMapReady) throw new Error('Mapa no está listo')
    if (!userLocation) throw new Error('No hay ubicación del usuario')

    map?.flyTo({ center: userLocation, zoom: 16 })
    setActivePlaceId('')
  }

  return (
    <button
      className="px-3 py-1.5 border border-zinc-900 bg-zinc-900 hover:bg-zinc-700 transition-colors text-white rounded-lg shadow-lg text-sm fixed top-4 right-4"
      onClick={onClick}
    >
      Mi ubicación
    </button>
  )
}

export { BtnMyLocation }
