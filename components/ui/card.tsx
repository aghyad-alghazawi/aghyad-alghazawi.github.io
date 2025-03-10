"use client"

import { JSX, memo, useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

class Pixel {
  width: number
  height: number
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color: string
  speed: number
  size: number
  sizeStep: number
  minSize: number
  maxSizeInteger: number
  maxSize: number
  delay: number
  counter: number
  counterStep: number
  isIdle: boolean
  isReverse: boolean
  isShimmer: boolean

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width
    this.height = canvas.height
    this.ctx = context
    this.x = x
    this.y = y
    this.color = color
    this.speed = this.getRandomValue(0.1, 0.9) * speed
    this.size = 0
    this.sizeStep = Math.random() * 0.4
    this.minSize = 0.5
    this.maxSizeInteger = 2
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger)
    this.delay = delay
    this.counter = 0
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01
    this.isIdle = false
    this.isReverse = false
    this.isShimmer = false
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    )
  }

  appear() {
    this.isIdle = false
    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true
    }
    if (this.isShimmer) {
      this.shimmer()
    } else {
      this.size += this.sizeStep
    }
    this.draw()
  }

  disappear() {
    this.isShimmer = false
    this.counter = 0
    if (this.size <= 0) {
      this.isIdle = true
      return
    } else {
      this.size -= 0.1
    }
    this.draw()
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true
    } else if (this.size <= this.minSize) {
      this.isReverse = false
    }
    if (this.isReverse) {
      this.size -= this.speed
    } else {
      this.size += this.speed
    }
  }
}

function getEffectiveSpeed(value: any, reducedMotion: any) {
  const min = 0
  const max = 100
  const throttle = 0.001
  const parsed = parseInt(value, 10)

  if (parsed <= min || reducedMotion) {
    return min
  } else if (parsed >= max) {
    return max * throttle
  } else {
    return parsed * throttle
  }
}

/**
 * Card variants with predefined styles
 */
const VARIANTS = {
  default: {
    activeColor: null,
    gap: 5,
    speed: 35,
    colors: "#f8fafc,#f1f5f9,#cbd5e1",
    noFocus: false,
  },
  blue: {
    activeColor: "#e0f2fe",
    gap: 10,
    speed: 25,
    colors: "#e0f2fe,#7dd3fc,#0ea5e9",
    noFocus: false,
  },
  yellow: {
    activeColor: "#fef08a",
    gap: 3,
    speed: 20,
    colors: "#fef08a,#fde047,#eab308",
    noFocus: false,
  },
  pink: {
    activeColor: "#fecdd3",
    gap: 6,
    speed: 80,
    colors: "#fecdd3,#fda4af,#e11d48",
    noFocus: true,
  },
}

interface PixelCardProps {
  variant?: "default" | "blue" | "yellow" | "pink"
  gap?: number
  speed?: number
  colors?: string
  noFocus?: boolean
  className?: string
  children: React.ReactNode
}

interface VariantConfig {
  activeColor: string | null
  gap: number
  speed: number
  colors: string
  noFocus: boolean
}

export const Card = memo(function Card({
  variant = "default",
  gap,
  speed,
  colors,
  noFocus,
  className = "",
  children,
}: PixelCardProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const animationRef = useRef<number | null>(null)
  const timePreviousRef = useRef<number>(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const isInView = useInView(containerRef, { once: false, margin: "100px" })

  useEffect(() => {
    setIsClient(true)
    timePreviousRef.current = performance.now()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const variantCfg: VariantConfig = VARIANTS[variant] || VARIANTS.default
  const finalGap = gap ?? variantCfg.gap
  const finalSpeed = speed ?? variantCfg.speed
  const finalColors = colors ?? variantCfg.colors
  const finalNoFocus = noFocus ?? variantCfg.noFocus

  const initPixels = () => {
    if (!containerRef.current || !canvasRef.current || !isClient) return

    const rect = containerRef.current.getBoundingClientRect()
    const width = Math.floor(rect.width)
    const height = Math.floor(rect.height)
    const ctx = canvasRef.current.getContext("2d", { alpha: true })

    if (!ctx) return

    canvasRef.current.width = width
    canvasRef.current.height = height
    canvasRef.current.style.width = `${width}px`
    canvasRef.current.style.height = `${height}px`

    const colorsArray = finalColors.split(",")
    const pxs: Pixel[] = []

    // Optimize by reducing the number of pixels for larger areas
    const pixelDensity = Math.max(
      1,
      Math.floor(Math.sqrt(width * height) / 100)
    )
    const effectiveGap = finalGap * pixelDensity

    for (let x = 0; x < width; x += effectiveGap) {
      for (let y = 0; y < height; y += effectiveGap) {
        const color =
          colorsArray[Math.floor(Math.random() * colorsArray.length)]

        const dx = x - width / 2
        const dy = y - height / 2
        const distance = Math.sqrt(dx * dx + dy * dy)
        const delay = reducedMotion ? 0 : distance

        pxs.push(
          new Pixel(
            canvasRef.current,
            ctx,
            x,
            y,
            color,
            getEffectiveSpeed(finalSpeed, reducedMotion),
            delay
          )
        )
      }
    }
    pixelsRef.current = pxs
  }

  const doAnimate = (fnName: keyof Pixel) => {
    if (!isClient || !isInView) return

    animationRef.current = requestAnimationFrame(() => doAnimate(fnName))
    const timeNow = performance.now()
    const timePassed = timeNow - timePreviousRef.current
    const timeInterval = 1000 / 60 // ~60 FPS

    if (timePassed < timeInterval) return
    timePreviousRef.current = timeNow - (timePassed % timeInterval)

    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx || !canvasRef.current) return

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    let allIdle = true
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i]
      const method = pixel[fnName] as Function
      method.call(pixel)
      if (!pixel.isIdle) {
        allIdle = false
      }
    }
    if (allIdle) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }

  const handleAnimation = (name: keyof Pixel) => {
    if (!isClient || !isInView) return

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    animationRef.current = requestAnimationFrame(() => doAnimate(name))
  }

  useEffect(() => {
    initPixels()
    const observer = new ResizeObserver(() => {
      initPixels()
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [finalGap, finalSpeed, finalColors, finalNoFocus, isClient])

  // Handle in-view animations
  useEffect(() => {
    if (isInView) {
      handleAnimation("appear")
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [isInView])

  const onMouseEnter = () => handleAnimation("appear")
  const onMouseLeave = () => handleAnimation("disappear")
  const onFocus: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return
    handleAnimation("appear")
  }
  const onBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return
    handleAnimation("disappear")
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden isolate transition-colors duration-200 ease-[cubic-bezier(0.5,1,0.89,1)] select-none ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <canvas
        className="absolute inset-0 w-full h-full block"
        ref={canvasRef}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
})
