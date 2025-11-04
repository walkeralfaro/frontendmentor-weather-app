'use client'

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDebounce } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
import { fetchCities } from "@/app/api"

export function SearchForm({ onSelect }: { onSelect: (city: any) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [cities, setCities] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCity, setSelectedCity] = useState<any>(null)
  const debouncedSearchTerm = useDebounce(query, 400)

  useEffect(() => {
    
    setLoading(true)
    const searchHN = async () => {
      let results = []
      if (debouncedSearchTerm) {
        const data = await fetchCities(debouncedSearchTerm)
        results = data.results || []
      }

      setCities(results)
      setLoading(false)
    }

    searchHN()
  }, [debouncedSearchTerm])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {selectedCity
            ? `${selectedCity.name}, ${selectedCity.country}`
            : "Buscar ciudad..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder="Escribe una ciudad..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && <CommandEmpty>Cargando...</CommandEmpty>}
            {!loading && !cities.length && (
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            )}
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.id}
                  value={city.name}
                  onSelect={() => {
                    setSelectedCity(city)
                    setOpen(false)
                    onSelect(city) // coords + nombre para OpenMeteo
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCity?.id === city.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.name}, {city.admin1}, {city.country} 
                  {/* ({city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}) */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
