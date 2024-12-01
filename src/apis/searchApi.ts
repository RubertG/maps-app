import axios from "axios"

// https://api.mapbox.com/search/geocode/v6/forward?q=estadio&limit=7&proximity=-72.5071178781108%2C7.907802865567703&language=es&access_token=asd

export const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/search/geocode/v6/forward",
  params: {
    limit: 5,
    language: "es",
    access_token: import.meta.env.VITE_ACCESS_TOKEN
  }
})