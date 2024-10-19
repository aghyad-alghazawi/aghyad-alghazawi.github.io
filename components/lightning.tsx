"use client";

import { ReactNode, useEffect, useRef } from "react";





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

interface LightningBorderProps {
  speed?: number // Controls fade speed
  maxTrailPoints?: number // Max number of points in the trail
  segmentRange?: [number, number] // Range for the number of lightning segments
  glowIntensity?: number // Intensity of glow (shadow blur)
  lineWidthRange?: [number, number] // Range for trail line width
  color?: string // Trail color
  borderSize?: number // Size of the square border
  smoothFactor?: number // Number of segments between corners
}

export const LightningBorder: React.FC<LightningBorderProps> = ({
  speed = 0.03,
  maxTrailPoints = 30, // Increased for smoother effect
  segmentRange = [8, 12], // More segments for each corner transition
  glowIntensity = 10,
  lineWidthRange = [1, 2],
  color = "rgba(255, 255, 255, 1)", // default white
  borderSize = 200, // Size of the square border
  smoothFactor = 15, // Number of segments between corners
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

    const drawLightningBorder = () => {
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
    }

    const animateBorder = () => {
      drawLightningBorder()
      requestAnimationFrame(animateBorder)
    }

    const generateSquareCorners = () => {
      const halfBorderSize = borderSize / 2;
      const corners = [
        { x: halfBorderSize, y: halfBorderSize }, // Top-left
        { x: window.innerWidth - halfBorderSize, y: halfBorderSize }, // Top-right
        { x: window.innerWidth - halfBorderSize, y: window.innerHeight - halfBorderSize }, // Bottom-right
        { x: halfBorderSize, y: window.innerHeight - halfBorderSize }, // Bottom-left
      ];

      return corners;
    }

    const animateBorderLoop = () => {
      const corners = generateSquareCorners();
      const totalCorners = corners.length;

      // Use current time to determine which corner to animate towards
      const time = Date.now() * 0.002; // Adjust speed of the animation
      const currentCornerIndex = Math.floor(time) % totalCorners;
      const nextCornerIndex = (currentCornerIndex + 1) % totalCorners;

      const startPoint = corners[currentCornerIndex];
      const endPoint = corners[nextCornerIndex];

      const segments = Math.ceil(smoothFactor); // Number of segments to generate between corners
      const lightningPoints = generateLightningPath(
        startPoint.x,
        startPoint.y,
        endPoint.x,
        endPoint.y,
        segments
      );

      lightningPoints.forEach((point) => {
        mouseTrailRef.current.push({
          x: point.x,
          y: point.y,
          opacity: 1.0,
          initialSegments: Math.floor(
            Math.random() * (segmentRange[1] - segmentRange[0]) +
              segmentRange[0]
          ),
        });
      });

      if (mouseTrailRef.current.length > maxTrailPoints) {
        mouseTrailRef.current.splice(0, mouseTrailRef.current.length - maxTrailPoints);
      }
    }

    animateBorderLoop(); // Start the loop
    animateBorder(); // Start the animation

    const intervalId = setInterval(animateBorderLoop, 100); // Adjust interval for corner transitions

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
      window.removeEventListener("resize", handleResize);
    }
  }, [
    speed,
    maxTrailPoints,
    segmentRange,
    glowIntensity,
    lineWidthRange,
    color,
    borderSize,
    smoothFactor,
  ])

  return (
    <canvas
      ref={canvasRef}
      id="lightning-border"
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
