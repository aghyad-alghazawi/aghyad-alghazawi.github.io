"use client"

import { useEffect, useRef } from "react"

interface TrailPoint {
  x: number
  y: number
  opacity: number
  initialSegments: number
}

interface LightningTrailProps {
  speed?: number // Controls fade speed
  maxTrailPoints?: number // Max number of points in the trail
  segmentRange?: [number, number] // Range for the number of lightning segments
  glowIntensity?: number // Intensity of glow (shadow blur)
  lineWidthRange?: [number, number] // Range for trail line width
  color?: string // Trail color
}

export const LightningTrail: React.FC<LightningTrailProps> = ({
  speed = 0.03,
  maxTrailPoints = 15,
  segmentRange = [6, 9],
  glowIntensity = 10,
  lineWidthRange = [1, 2],
  color = "rgba(255, 255, 255, 1)", // default white
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseTrailRef = useRef<TrailPoint[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!canvas || !ctx) return

    const scaleFactor = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * scaleFactor
    canvas.height = window.innerHeight * scaleFactor
    ctx.scale(scaleFactor, scaleFactor)

    const handleResize = () => {
      canvas.width = window.innerWidth * scaleFactor
      canvas.height = window.innerHeight * scaleFactor
      ctx.scale(scaleFactor, scaleFactor)
    }

    const generateLightningPath = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      segments: number
    ) => {
      const points = [{ x: startX, y: startY }]
      for (let i = 1; i < segments; i++) {
        const t = i / segments
        const newX =
          startX +
          easeInOutQuad(t) * (endX - startX) +
          (Math.random() - 0.5) * 15
        const newY =
          startY +
          easeInOutQuad(t) * (endY - startY) +
          (Math.random() - 0.5) * 15
        points.push({ x: newX, y: newY })
      }
      points.push({ x: endX, y: endY })
      return points
    }

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    const drawLightningTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const trail = mouseTrailRef.current

      for (let i = 0; i < trail.length - 1; i++) {
        const start = trail[i]
        const end = trail[i + 1]

        const segments = Math.max(
          3,
          Math.floor(start.initialSegments * start.opacity)
        )
        const points = generateLightningPath(
          start.x,
          start.y,
          end.x,
          end.y,
          segments
        )

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }

        // Set both the shadow (glow) and stroke color dynamically
        ctx.shadowBlur = glowIntensity
        ctx.shadowColor = color // Shadow color based on prop
        ctx.strokeStyle = color.replace(/, [^,]+\)$/, `, ${start.opacity})`) // Update stroke color with opacity
        ctx.lineWidth = Math.max(
          lineWidthRange[0],
          lineWidthRange[1] * start.opacity
        )
        ctx.stroke()

        start.opacity -= speed
      }

      mouseTrailRef.current = trail.filter((point) => point.opacity > 0)
    }

    const animateTrail = () => {
      drawLightningTrail()
      requestAnimationFrame(animateTrail)
    }

    let animationFrameId: number
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) return
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = 0

        const trail = mouseTrailRef.current
        const lastPoint = trail.length > 0 ? trail[trail.length - 1] : null

        const trailDistance = Math.random() * 15 + 15

        if (
          !lastPoint ||
          Math.hypot(lastPoint.x - e.clientX, lastPoint.y - e.clientY) >
            trailDistance
        ) {
          trail.push({
            x: e.clientX,
            y: e.clientY,
            opacity: 1.0,
            initialSegments: Math.floor(
              Math.random() * (segmentRange[1] - segmentRange[0]) +
                segmentRange[0]
            ),
          })

          if (trail.length > maxTrailPoints) {
            trail.shift()
          }
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    animateTrail()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [
    speed,
    maxTrailPoints,
    segmentRange,
    glowIntensity,
    lineWidthRange,
    color,
  ])

  return (
    <canvas
      ref={canvasRef}
      id="lightning-trail"
      style={{
        pointerEvents: "none",
        display: "block",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    />
  )
}