import { Hourly } from "@/schema"

export default function groupWeatherByDay(data: Hourly) {
  const grouped: Record<string, { time: string; temperature: number; code: number }[]> = {}

  data.time.forEach((t, i) => {
    const date = new Date(t)
    const day = date.toLocaleDateString("en-US", { 
      weekday: "long",
      timeZone: "UTC"
    })
    const hour = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: "UTC",
    })

    if (!grouped[day]) grouped[day] = []

    grouped[day].push({
      time: hour,
      temperature: data.temperature_2m[i.toString()],
      code: data.weather_code[i.toString()],
    })
  })

  return grouped
}
