import { MapProvider, PlacesProvider } from "./context"
import { HomePage } from "./pages"

export function MapsApp() {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomePage />
      </MapProvider>
    </PlacesProvider>
  )
}
