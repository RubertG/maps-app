import { PlacesProvider } from "./context"
import { HomePage } from "./pages"

export function MapsApp() {
  return (
    <PlacesProvider>
      <HomePage />
    </PlacesProvider>
  )
}
