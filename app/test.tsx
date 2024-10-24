"use client"

import React, { useEffect, useState } from "react"
import Script from "next/script"
import { AnimatePresence, motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.canvas
          id={"c"}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ display: "none" }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        >
          <Script src="/scripts/lightning.js" />
        </motion.canvas>
      )}
      {isLoaded && children}
    </AnimatePresence>
  )
}
