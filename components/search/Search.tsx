'use client'

import { SearchForm } from "./SearchForm";

export default function Search() {
  return (
    <div className="font-bricolage-grotesque">
    <SearchForm onSelect={(city) => console.log(city)}/>
    </div>
  )
}