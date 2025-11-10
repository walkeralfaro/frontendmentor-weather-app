import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function celciusToFahrenheit(c: number, temperatureUnit: string) {
  let temperature = c
  if (temperatureUnit === 'fahrenheit') temperature = (c * 9 / 5) + 32
  
  return Math.trunc(temperature)
}

export function kmhToMph(kmh: number, windUnit: string) {
  let windspeed = kmh
  if (windUnit === 'mph') windspeed = kmh * 0.621371
  
  return Math.trunc(windspeed)
}

export function mmToInch(mm: number, precipitationUnit: string) {
  let precipitation = mm
  if(precipitationUnit === 'in') precipitation = mm / 25.4

  return Math.trunc(precipitation)
}

export function formatDate(date: Date) {
  const newDate = new Date(date)

  const formatted = newDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  })

  return formatted
}