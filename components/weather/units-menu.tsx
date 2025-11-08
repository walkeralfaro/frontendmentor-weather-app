'use client'

import { useUnitStore } from "@/store/useUnitStore"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export function UnitsMenu() {
  const {
    temperatureUnit, windUnit, precipitationUnit,
    setTemperatureUnit, setWindUnit, setPrecipitationUnit
  } = useUnitStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><Settings /> Units</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>Temperature</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTemperatureUnit("celsius")}>
          {temperatureUnit === "celsius" && "✓"} Celsius (°C)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTemperatureUnit("fahrenheit")}>
          {temperatureUnit === "fahrenheit" && "✓"} Fahrenheit (°F)
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setWindUnit("kmh")}>
          {windUnit === "kmh" && "✓"} km/h
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setWindUnit("mph")}>
          {windUnit === "mph" && "✓"} mph
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Precipitation</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setPrecipitationUnit("mm")}>
          {precipitationUnit === "mm" && "✓"} Millimeters (mm)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setPrecipitationUnit("in")}>
          {precipitationUnit === "in" && "✓"} Inches (in)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
