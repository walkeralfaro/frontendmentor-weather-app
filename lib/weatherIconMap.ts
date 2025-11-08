export const weatherIconMap: Record<number, string> = {
  0: "icon-sunny",
  1: "icon-partly-cloudy",
  2: "icon-partly-cloudy",
  3: "icon-overcast",
  45: "icon-fog",
  48: "icon-fog",
  51: "icon-drizzle",
  53: "icon-drizzle",
  55: "icon-drizzle",
  56: "icon-drizzle",
  57: "icon-drizzle",
  61: "icon-rain",
  63: "icon-rain",
  65: "icon-rain",
  66: "icon-rain",
  67: "icon-rain",
  71: "icon-snow",
  73: "icon-snow",
  75: "icon-snow",
  77: "icon-snow",
  80: "icon-rain",
  81: "icon-rain",
  82: "icon-rain",
  85: "icon-snow",
  86: "icon-snow",
  95: "icon-storm",
  96: "icon-storm",
  99: "icon-storm",
}

export function getWeatherIconPath(code: number): string {
  const icon = weatherIconMap[code] || "icon-overcast"
  return `/weather-icons/${icon}.webp`
}