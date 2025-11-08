import Image from "next/image";
import { UnitsMenu } from "../weather/units-menu";

export default function Header() {
  return (
    <header className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center p-4">

        <a href="/" className="relative h-8 aspect-4/1">
          <Image fill src="/logo.svg" alt="logo image" loading="eager"/>
        </a>

        <UnitsMenu />

      </div>
    </header>
  )
}