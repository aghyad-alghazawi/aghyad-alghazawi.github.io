"use client"

import React, { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

import { DecryptedText } from "@/components/ui/decrypted-text"

export interface TimelineEntry {
  id: string
  year: string
  title: string
  description: string
  image?: string
}

const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [textKey, setTextKey] = useState(0)
  const lineAnimations = useAnimation()
  const pointAnimations = useAnimation()

  const resetTimeline = async () => {
    await Promise.all([
      lineAnimations.start({ scaleX: 0, transition: { duration: 0.5 } }),
      pointAnimations.start({ scale: 1, transition: { duration: 0.5 } }),
    ])
    setActiveIndex(0)
  }

  useEffect(() => {
    if (isAnimating) return

    const animateNextStep = async () => {
      setIsAnimating(true)

      // Highlight current point with smoother easing
      await pointAnimations.start((point) => ({
        scale: point.id === activeIndex ? 1.3 : 1,
        transition: {
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1], // Custom spring-like bounce
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
        backgroundColor:
          point.id === activeIndex
            ? "hsl(var(--dark))"
            : "hsl(var(--dark) / 60%)",
      }))

      // Trigger decrypted text animation by changing the key
      setTextKey((prev) => prev + 1)

      // Wait a bit for the text animation, using requestAnimationFrame for better performance
      await new Promise<void>((resolve) => {
        const timeToWait = 2000
        const startTime = performance.now()

        const checkTime = (currentTime: number) => {
          if (currentTime - startTime >= timeToWait) {
            resolve()
          } else {
            requestAnimationFrame(checkTime)
          }
        }

        requestAnimationFrame(checkTime)
      })

      // If not the last point, animate line and move to next
      if (activeIndex < data.length - 1) {
        // Animate line to next point with smoother easing
        await lineAnimations.start((line) => {
          if (line.id === activeIndex) {
            return {
              scaleX: 1,
              transition: {
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96], // Custom cubic bezier for smooth drawing
              },
            }
          }
          return {}
        })

        // Set next index but don't wait for state update
        const nextIndex = activeIndex + 1

        // Pre-highlight the next point while text is decrypting
        await pointAnimations.start((point) => ({
          scale: point.id === nextIndex ? 1.3 : 1,
          transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          },
          backgroundColor:
            point.id === nextIndex
              ? "hsl(var(--dark))"
              : "hsl(var(--dark) / 60%)",
        }))

        // Trigger decrypted text animation for the next point
        setActiveIndex(nextIndex)
        setTextKey((prev) => prev + 1)
      } else {
        // At the last point, wait longer then reset
        await new Promise((resolve) => setTimeout(resolve, 3000))
        await resetTimeline()
      }

      setIsAnimating(false)
    }

    animateNextStep()
  }, [activeIndex, isAnimating, lineAnimations, pointAnimations, data.length])

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="relative w-full mb-8">
        <div className="flex justify-between items-center px-2 py-6">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="relative w-[100px] flex flex-col items-center"
            >
              {/* Point */}
              <motion.div
                custom={{ id: index }}
                animate={pointAnimations}
                initial={{ scale: index === 0 ? 1.3 : 1 }}
                className="h-6 w-6 rounded-full bg-dark/60 flex items-center justify-center z-10 will-change-transform"
              >
                <div className="h-2 w-2 rounded-full bg-light" />
              </motion.div>

              {/* Year label */}
              <div className="mt-2 text-xs text-light/60">{item.year}</div>

              {/* Line to next point */}
              {index < data.length - 1 && (
                <motion.div
                  custom={{ id: index }}
                  animate={lineAnimations}
                  initial={{ scaleX: 0 }}
                  className="absolute left-[80px] top-[12px] h-[2px] w-full bg-light origin-left will-change-transform"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-dark/20 backdrop-blur-sm rounded-sm p-6 min-h-[200px]">
        <div className="flex flex-col">
          <h3 className="text-xl text-light font-medium mb-6">
            <DecryptedText
              key={`title-${textKey}`}
              text={data[activeIndex].title}
              speed={30}
              maxIterations={5}
              sequential={true}
              animateOn="view"
              className="text-light"
              encryptedClassName="text-light/50"
            />
          </h3>
          <p className="text-light/80 text-sm leading-relaxed">
            <DecryptedText
              key={`desc-${textKey}`}
              text={data[activeIndex].description}
              speed={10}
              maxIterations={3}
              sequential={false}
              animateOn="view"
              revealDirection="start"
              className="text-light/80"
              encryptedClassName="text-light/40"
            />
          </p>
        </div>
      </div>
    </div>
  )
}

export { Timeline }
