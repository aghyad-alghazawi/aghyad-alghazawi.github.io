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
  color = "rgba(255, 255, 255, 1)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseTrailRef = useRef<TrailPoint[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!canvas || !ctx) return

    const scaleFactor = window.devicePixelRatio || 1

    const resizeCanvas = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * scaleFactor
      canvas.height = height * scaleFactor
      ctx.scale(scaleFactor, scaleFactor)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const generateLightningPath = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      segments: number
    ) => {
      const points = [{ x: startX, y: startY }]
      const deltaX = endX - startX
      const deltaY = endY - startY

      for (let i = 1; i < segments; i++) {
        const t = i / segments
        points.push({
          x: startX + easeInOutQuad(t) * deltaX + (Math.random() - 0.5) * 10,
          y: startY + easeInOutQuad(t) * deltaY + (Math.random() - 0.5) * 10,
        })
      }

      points.push({ x: endX, y: endY })
      return points
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
        for (const point of points) ctx.lineTo(point.x, point.y)

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

      mouseTrailRef.current = trail.filter((point) => point.opacity > 0)

      animationFrameRef.current = requestAnimationFrame(drawLightningTrail)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const trail = mouseTrailRef.current
      const lastPoint = trail[trail.length - 1]

      const trailDistanceSquared = 900 // 30^2 for better performance
      if (
        !lastPoint ||
        (lastPoint.x - e.clientX) ** 2 + (lastPoint.y - e.clientY) ** 2 >
          trailDistanceSquared
      ) {
        trail.push({
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          initialSegments:
            Math.random() * (segmentRange[1] - segmentRange[0]) +
            segmentRange[0],
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
      if (animationFrameRef.current !== undefined)
        cancelAnimationFrame(animationFrameRef.current)
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
