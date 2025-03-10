import { JSX, ReactNode, useEffect, useRef, useState } from "react"
// replace icons with your own if needed
import { Circle, Code, FileText, Layout, Stack } from "@phosphor-icons/react"
import { motion, useMotionValue, useTransform } from "framer-motion"

export interface CarouselItem {
  title: string
  description: string
  id: number
  icon: JSX.Element
}

export interface CarouselProps {
  children: ReactNode[]
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
}

const SECTION_HEIGHT = 100 // vh units
const SCROLL_COOLDOWN = 500 // ms

const Carousel = ({
  children,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}: CarouselProps): JSX.Element => {
  const carouselItems = loop ? [...children, children[0]] : children
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const y = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const touchStartY = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return
    const updateHeight = () => {
      setContainerHeight(containerRef.current?.clientHeight || 0)
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  const handleScroll = (direction: -1 | 1) => {
    if (isScrolling) return

    setIsScrolling(true)

    if (direction > 0 && currentIndex < children.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else if (direction < 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }

    setTimeout(() => setIsScrolling(false), SCROLL_COOLDOWN)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const direction = Math.sign(e.deltaY) as -1 | 1
    handleScroll(direction)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY

    if (Math.abs(deltaY) > 50) {
      // Min swipe distance
      handleScroll(deltaY > 0 ? 1 : -1)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "none" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y }}
        animate={{ y: -(currentIndex * containerHeight) }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
          mass: 1,
        }}
      >
        {carouselItems.map((item, index) => (
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-[600px] h-full mt-24 flex flex-col items-start justify-start"
            style={{
              y: index * containerHeight,
            }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        {children.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-light" : "bg-light/40"
            }`}
            animate={{
              scale: currentIndex === index ? 1.2 : 1,
            }}
            onClick={() => setCurrentIndex(index)}
            transition={{ duration: 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

export { Carousel }
