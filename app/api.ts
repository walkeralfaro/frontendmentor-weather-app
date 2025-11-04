export const fetchCities = async (query: string) => {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`)
  const data = await res.json()
  return data
}

