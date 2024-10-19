"use client"

import React from "react"

import { LightningBorder, LightningTrail } from "@/components/lightning"

export default function Page() {
  return (
    <main>
      <section className="flex items-center justify-center w-full">
        <LightningTrail />
        <LightningBorder />
          {/* <div className="w-20 h-20 bg-red-800" />
        </LightningBorder> */}
      </section>
    </main>
  )
}
