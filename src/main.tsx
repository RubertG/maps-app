import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN

if ( !navigator.geolocation ) {
  alert('Tu navegador no soporta la geolocalización :(')
  throw new Error('Geolocation is not supported by your browser')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
