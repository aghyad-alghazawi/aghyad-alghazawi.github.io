"use client"

import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { Code, TerminalWindow, Trophy } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import {
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud"

import { CountUp } from "@/components/ui/counter"

// Dynamically import the Cloud component with no SSR
const Cloud = dynamic(
  () => import("react-icon-cloud").then((mod) => mod.Cloud),
  { ssr: false }
)

const slugs = [
  "typescript",
  "javascript",
  "rust",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "netlify",
  "jest",
  "redis",
  "docker",
  "git",
  "bun",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "tailwindcss",
  "figma",
  "threejs",
  "graphql",
  "python",
  "cplusplus",
  "django",
  "flask",
  "fastapi",
  "nestjs",
  "supabase",
  "mongodb",
  "mysql",
  "convex",
  "digitalocean",
  "reactnative",
  "stripe",
  "clerk",
  "cloudflare",
  "pytorch",
]

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
}

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510"
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff"
  const minContrastRatio = theme === "dark" ? 2 : 1.2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  })
}

export type DynamicCloudProps = {
  iconSlugs: string[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

const IconCloud = ({ iconSlugs }: DynamicCloudProps) => {
  const [data, setData] = useState<IconData | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
  }, [iconSlugs])

  const renderedIcons = useMemo(() => {
    if (!data) return null

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, "dark")
    )
  }, [data])

  // Don't render on server or before mounting
  if (!isMounted) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Counter stat item component
interface StatItemProps {
  icon: React.ReactNode
  count: number
  label: string
  subtitle: string
}

const StatItem = ({ icon, count, label, subtitle }: StatItemProps) => {
  return (
    <motion.div className="mb-8" variants={itemVariants}>
      <div className="flex items-center gap-3 mb-1">
        <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-dark/20 backdrop-blur-sm text-light">
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <CountUp
              to={count}
              className="text-2xl font-bold text-light"
              duration={2.5}
            />
            <span className="text-light/80 text-sm font-medium">{label}</span>
          </div>
          <p className="text-light/60 text-xs">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  )
}

const Stack = () => {
  return (
    <motion.div
      className="text-left"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-4xl font-monts font-bold mb-8"
        variants={itemVariants}
      >
        Tech Stack & Experience
      </motion.h2>
      <motion.p
        className="text-light/80 mb-12 max-w-2xl"
        variants={itemVariants}
      >
        Proficient in a wide range of technologies, with extensive experience
        building applications across various platforms and domains.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
        variants={itemVariants}
      >
        {/* Left column - Stats */}
        <div className="flex flex-col justify-between">
          <div>
            <motion.h3
              className="text-2xl font-monts font-semibold mb-6"
              variants={itemVariants}
            >
              By the numbers
            </motion.h3>

            <StatItem
              icon={<Code size={20} weight="bold" />}
              count={30}
              label="technologies"
              subtitle="Core technologies in daily use"
            />

            <StatItem
              icon={<TerminalWindow size={20} weight="bold" />}
              count={6}
              label="years"
              subtitle="Professional development experience"
            />

            <StatItem
              icon={<Trophy size={20} weight="bold" />}
              count={50}
              label="projects"
              subtitle="Completed across various domains"
            />

            <motion.div className="hidden lg:block" variants={itemVariants}>
              <p className="text-sm text-light/70">
                Continuously expanding my toolkit with emerging technologies and
                best practices
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right column - Icon Cloud */}
        <motion.div
          className="relative flex justify-center items-center p-8 my-12 rounded-sm bg-dark/60 backdrop-blur-sm overflow-hidden"
          variants={itemVariants}
          whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <IconCloud iconSlugs={slugs} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export { Stack }
