"use client"

import { useEffect, useRef } from "react"

interface TrailPoint {
  x: number
  y: number
  opacity: number
  initialSegments: number
}

interface LightningTrailProps {
  speed?: number
  maxTrailPoints?: number
  segmentRange?: [number, number]
  glowIntensity?: number
  lineWidthRange?: [number, number]
  color?: string
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * scaleFactor
      canvas.height = window.innerHeight * scaleFactor
      ctx.scale(scaleFactor, scaleFactor)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

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

      trail.forEach((start, i) => {
        if (i < trail.length - 1) {
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
          points.forEach((point) => ctx.lineTo(point.x, point.y))

          ctx.shadowBlur = glowIntensity
          ctx.shadowColor = color
          ctx.strokeStyle = color.replace(/, [^,]+\)$/, `, ${start.opacity})`)
          ctx.lineWidth = Math.max(
            lineWidthRange[0],
            lineWidthRange[1] * start.opacity
          )
          ctx.stroke()

          start.opacity -= speed
        }
      })

      mouseTrailRef.current = trail.filter((point) => point.opacity > 0)
      requestAnimationFrame(drawLightningTrail)
    }

    let lastAnimationFrameId: number
    const handleMouseMove = (e: MouseEvent) => {
      const trail = mouseTrailRef.current
      const lastPoint = trail.length > 0 ? trail[trail.length - 1] : null

      const trailDistance = 30 // fixed trail distance for performance

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
    }

    window.addEventListener("mousemove", handleMouseMove)

    drawLightningTrail()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
      if (lastAnimationFrameId) cancelAnimationFrame(lastAnimationFrameId)
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
