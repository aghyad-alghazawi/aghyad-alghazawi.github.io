"use client"

import React from "react"

// import { LightningBolt } from "@/components/lightning"

export default function Page() {
  return (
    <main>
      <section className="justify-center items-center flex w-full">
        {/* <LightningBolt /> */}
        <div id="intense-target" className="pointer-events-auto bg-blue-900 w-[20vw] h-[20vw] text-center justify-center items-center content-center cursor-pointer">Hover over me for chaos!</div>
      </section>
    </main>
  )
}
