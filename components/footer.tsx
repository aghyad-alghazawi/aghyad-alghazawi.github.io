"use client"

import { LINKS } from "@/lib/constants"

import { FloatingDock } from "./ui/floating-dock"
import { IconContext } from "@phosphor-icons/react"

const Footer = () => {
  return (
    <IconContext.Provider
      value={{
        color: "white",
        // size: 24,
        weight: "regular",
        mirrored: false,
      }}
    >
      <div className="flex items-center justify-center">
        <FloatingDock items={LINKS} />
      </div>
    </IconContext.Provider>
  )
}

export { Footer }
