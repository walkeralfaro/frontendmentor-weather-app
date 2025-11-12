'use client'

import { useUnitStore } from "@/store/useUnitStore"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, Settings } from "lucide-react"

export function UnitsMenu() {
  const {
    temperatureUnit, windUnit, precipitationUnit,
    setTemperatureUnit, setWindUnit, setPrecipitationUnit
  } = useUnitStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="dark:bg-secondary"><Settings /> Units <ChevronDown /></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <h3 className="p-2 text-sm">Switch to Imperial</h3>
        <DropdownMenuLabel className="text-xs text-muted-foreground">Temperature</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTemperatureUnit("celsius")} className="flex justify-between">
          Celsius (°C) {temperatureUnit === "celsius" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTemperatureUnit("fahrenheit")}>
          Fahrenheit (°F) {temperatureUnit === "fahrenheit" && <Check />}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mx-2" />
        <DropdownMenuLabel className="text-xs text-muted-foreground">Wind Speed</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setWindUnit("kmh")} className="flex justify-between">
          km/h {windUnit === "kmh" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setWindUnit("mph")} className="flex justify-between">
          mph {windUnit === "mph" && <Check />}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mx-2" />
        <DropdownMenuLabel className="text-xs text-muted-foreground">Precipitation</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setPrecipitationUnit("mm")} className="flex justify-between">
          Millimeters (mm) {precipitationUnit === "mm" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setPrecipitationUnit("in")} className="flex justify-between">
          Inches (in) {precipitationUnit === "in" && <Check />}
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
