import { string, z } from 'zod'

export const citySchema  = z.object({
  id: z.number(),
  admin1: z.string().optional(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
})

export const citiesResponseSchema = z.object({
  results: z.array(citySchema).nullable()
})

export type City = z.infer<typeof citySchema>

// Open Meteo - Current
export const currentSchema = z.object({
  apparent_temperature: z.number(),
  precipitation: z.number(),
  relative_humidity_2m: z.number(),
  temperature_2m: z.number(),
  time: z.date(),
  wind_speed_10m: z.number(),
  weather_code: z.number()
})

export type Current = z.infer<typeof currentSchema>

// Open Meteo - Daily
export const dailySchema = z.object({
  time: z.array(z.string()), // convierte ISO string → Date
  temperature_2m_max: z.record(z.string(), z.number()),
  temperature_2m_min: z.record(z.string(), z.number()),
  weather_code: z.record(z.string(), z.number()),
})

export type Daily = z.infer<typeof dailySchema>