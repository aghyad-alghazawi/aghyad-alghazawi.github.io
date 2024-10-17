"use client"

import { useEffect, useState } from "react"
import Name from "@/public/assets/name.svg"

import Styles from "@/styles/modules/materialize.module.css"

type SvgPath = {
  d: string
  length: number
}

export const Materialize = ({ svgUrl }: { svgUrl: string }) => {
  const [paths, setPaths] = useState<SvgPath[]>([])

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(svgUrl)
        const svgText = await response.text()

        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml")
        const pathElements = svgDoc.querySelectorAll("path")

        const svgPaths: SvgPath[] = Array.from(pathElements).map((path) => ({
          d: path.getAttribute("d") || "",
          length: path.getTotalLength() || 0,
        }))

        setPaths(svgPaths)
      } catch (error) {
        console.error("Error loading SVG:", error)
      }
    }

    loadSvg()
  }, [svgUrl])

  return (
    <svg
      viewBox="0 0 608 144"
      xmlns="http://www.w3.org/2000/svg"
      className={Styles.box}
    >
      {paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          // strokeDasharray={path.length}
          // strokeDashoffset={path.length}
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </svg>
  )
}
