"use client"

import { TrendUp } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { skill: "Backend Dev", proficiency: 95 },
  { skill: "Frontend Dev", proficiency: 90 },
  { skill: "System Design", proficiency: 85 },
  { skill: "DevOps", proficiency: 75 },
  { skill: "UI/UX Design", proficiency: 85 },
  { skill: "Cybersecurity", proficiency: 75 },
]

const chartConfig = {
  proficiency: {
    label: "Proficiency",
  },
} satisfies ChartConfig

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

const chartVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
}

const Stats = () => {
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
        Skills & Expertise
      </motion.h2>

      <motion.div variants={chartVariants}>
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-full max-h-[300px] pointer-events-auto stroke-light"
        >
          <RadarChart data={chartData} className="mx-8" outerRadius="65%">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-dark/60 opacity-50" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: "hsl(var(--light))",
                fontSize: 12,
              }}
              tickSize={25}
              dy={4}
            />
            <Radar
              className="fill-dark stroke-transparent"
              dataKey="proficiency"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </motion.div>
      <motion.h3
        className="text-2xl font-monts font-semibold my-2"
        variants={itemVariants}
      >
        Technical Expertise
      </motion.h3>
      <motion.p
        className="text-sm text-muted-foreground mb-4"
        variants={itemVariants}
      >
        Core competencies & skill areas
      </motion.p>
      <motion.div className="mt-4 text-sm" variants={itemVariants}>
        <div className="flex items-center gap-2 font-medium">
          <TrendUp className="h-4 w-4" />
          Continuously expanding expertise in emerging technologies
        </div>
        <div className="text-muted-foreground mt-1">
          6+ years of professional experience
        </div>
      </motion.div>
    </motion.div>
  )
}

export { Stats }
