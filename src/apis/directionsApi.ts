import axios from "axios"

// https://api.mapbox.com/directions/v5/mapbox/driving/-74.157491%2C40.774939%3B-74.058005%2C40.796167?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=pk.eyJ1IjoicnViZXJ0ZyIsImEiOiJjbTQyOGc2NGIwNzMwMnFwdDE3ZnY0ZTF4In0.I-5vh2kGGC_I64P75csLUw

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "full",
    steps: false,
    access_token: import.meta.env.VITE_ACCESS_TOKEN
  }
})

export { directionsApi }