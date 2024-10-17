const canvas = document.getElementById("lightning-trail")
const ctx = canvas.getContext("2d")

// Canvas setup
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let mouseTrail = []
const maxTrailPoints = 15 // Maximum trail points for smoother trail
const fadeSpeed = 0.03 // Speed for gradual fading

// Function to generate a smoother lightning path between two points
function generateLightningPath(startX, startY, endX, endY, segments) {
  const points = [{ x: startX, y: startY }]
  for (let i = 1; i < segments; i++) {
    let t = i / segments
    let newX =
      startX + easeInOutQuad(t) * (endX - startX) + (Math.random() - 0.5) * 15 // Slight randomness for jagged effect
    let newY =
      startY + easeInOutQuad(t) * (endY - startY) + (Math.random() - 0.5) * 15
    points.push({ x: newX, y: newY })
  }
  points.push({ x: endX, y: endY })
  return points
}

// Easing function for smoother transitions
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

// Function to draw the lightning trail
function drawLightningTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas on each frame

  for (let i = 0; i < mouseTrail.length - 1; i++) {
    const start = mouseTrail[i]
    const end = mouseTrail[i + 1]

    // Segments decrease over time, starting from the initial value and fading to a minimum value of 3
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

    // Set stroke style with fading opacity for the trail effect
    ctx.shadowBlur = 10 // Add some blur for a glowing effect
    ctx.shadowColor = "rgba(255, 255, 255, 0.6)" // Color of the glow
    ctx.strokeStyle = `rgba(255, 255, 255, ${start.opacity})`
    ctx.lineWidth = Math.max(1, 2 * start.opacity) // Make the trail width dynamic
    ctx.stroke()

    // Decrease opacity for fading out
    start.opacity -= fadeSpeed
  }

  // Remove the oldest points once fully faded
  mouseTrail = mouseTrail.filter((point) => point.opacity > 0)
}

// Capture mouse movement and add new trail points
window.addEventListener("mousemove", (e) => {
  const lastPoint =
    mouseTrail.length > 0 ? mouseTrail[mouseTrail.length - 1] : null

  // Randomized trail distance between 15 and 30
  const trailDistance = Math.random() * 15 + 15

  if (
    !lastPoint ||
    Math.hypot(lastPoint.x - e.clientX, lastPoint.y - e.clientY) > trailDistance
  ) {
    // Add a new point with full opacity and initial segments
    mouseTrail.push({
      x: e.clientX,
      y: e.clientY,
      opacity: 1.0,
      initialSegments: Math.floor(Math.random() * 3 + 6), // Random segments between 6 and 9
    })

    // Limit the number of trail points for performance
    if (mouseTrail.length > maxTrailPoints) {
      mouseTrail.shift()
    }
  }
})

// Animation loop to draw the trail
function animateTrail() {
  drawLightningTrail()
  requestAnimationFrame(animateTrail) // Continuously update the trail
}

// Start the animation loop
animateTrail()
