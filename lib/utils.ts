import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toFahrenheit(c: number) {
  return (c * 9 / 5) + 32
}

export function kmhToMph(kmh: number) {
  return kmh * 0.621371
}

export function mmToInch(mm: number) {
  return mm / 25.4
}