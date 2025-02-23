"use client"

import { TrendUp } from "@phosphor-icons/react"
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
  { skill: "DevOps", proficiency: 80 },
  { skill: "UI/UX Design", proficiency: 85 },
  { skill: "Cybersecurity", proficiency: 75 },
]

const chartConfig = {
  proficiency: {
    label: "Proficiency",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <div className="text-left">
      <ChartContainer
        config={chartConfig}
        className="aspect-square max-h-[400px] pointer-events-auto stroke-light"
      >
        <RadarChart
          data={chartData}
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          outerRadius="65%"
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarGrid className="fill-[hsl(var(--electric-blue))] opacity-50" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: "hsl(var(--light))",
              fontSize: 12,
            }}
            tickSize={15}
            dy={4}
          />
          <Radar
            className="fill-[hsl(var(--electric-blue))] stroke-transparent"
            dataKey="proficiency"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ChartContainer>
      <h3 className="text-lg font-medium mb-2">Technical Expertise</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Core competencies & skill areas
      </p>
      <div className="mt-4 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <TrendUp className="h-4 w-4" />
          Continuously expanding expertise in emerging technologies
        </div>
        <div className="text-muted-foreground mt-1">
          6+ years of professional experience
        </div>
      </div>
    </div>
  )
}
