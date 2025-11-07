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
import { City } from "@/schema"
import { fetchCities } from "@/lib/weather"

export function SearchForm({ onSelectCity, localCity }: { onSelectCity: (city: City) => void, localCity?: City | null }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCity, setSelectedCity] = useState<any>(null)
  const debouncedSearchTerm = useDebounce(query, 400)

  useEffect(() => {
    if (localCity && !selectedCity) {
      setSelectedCity(localCity)
    }
  }, [localCity])

  useEffect(() => {
    const search = async () => {
      if (debouncedSearchTerm.trim().length < 2) {
        setCities([])
        return
      }

      setLoading(true)
      const results = await fetchCities(debouncedSearchTerm) || []
      setCities(results)
      setLoading(false)
    }

    search()
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
                  value={`${city.name}-${city.id}`}
                  onSelect={() => {
                    setSelectedCity(city)
                    setOpen(false)
                    onSelectCity(city)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCity?.id === city.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.name}, {city.admin1}, {city.country}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
