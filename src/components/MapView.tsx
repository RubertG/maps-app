import { useContext, useLayoutEffect, useRef } from "react"
import { MapContext, PlacesContext } from "../context"
import { Loading } from "./Loading"
import { Map } from "mapbox-gl"

export function MapView() {
  const { isLoading, userLocation } = useContext(PlacesContext)
  const { setMap } = useContext(MapContext)
  const mapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapRef.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 14
      })

      setMap(map)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, userLocation])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div
      className="w-full h-screen fixed top-0 left-0"
      ref={mapRef}
    >
    </div>
  )
}
