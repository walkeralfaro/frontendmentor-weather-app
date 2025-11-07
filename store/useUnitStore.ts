import { create } from 'zustand'

export type TemperatureUnit = "celsius" | "fahrenheit"
export type WindUnit = "kmh" | "mph"
export type PrecipitationUnit = "mm" | "in"

interface UnitState {
  temperatureUnit: TemperatureUnit
  windUnit: WindUnit
  precipitationUnit: PrecipitationUnit
  setTemperatureUnit: (unit: TemperatureUnit) => void
  setWindUnit: (unit: WindUnit) => void
  setPrecipitationUnit: (unit: PrecipitationUnit) => void
}

export const useUnitStore = create<UnitState>((set) => ({
  temperatureUnit: "celsius",
  windUnit: "kmh",
  precipitationUnit: "mm",
  setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
  setWindUnit: (unit) => set({ windUnit: unit }),
  setPrecipitationUnit: (unit) => set({ precipitationUnit: unit }),
}))