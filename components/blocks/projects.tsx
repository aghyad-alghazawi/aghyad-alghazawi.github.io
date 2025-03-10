"use client"

import { motion } from "framer-motion"

import { Timeline, TimelineEntry } from "@/components/ui/timeline"

const projectsData: TimelineEntry[] = [
  {
    id: "project-1",
    year: "2023",
    title: "Cross-Platform App",
    description:
      "Built a cross-platform mobile application using React Native, providing a seamless user experience across iOS and Android platforms with a realtime database update.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "project-3",
    year: "2022",
    title: "AI-Powered Discord Bot",
    description:
      "Created a comprehensive Discord bot powered by AI capabilities to have a human-like chat with its users. Implemented various tools for image/audio manipulations, as well as, many tools and fun minigames/activities.",
    image:
      "https://images.unsplash.com/photo-1614729373246-42c9c9999e8d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "project-4",
    year: "2022",
    title: "Social Media Automation",
    description:
      "Developed automation scripts in Python for automating various tasks on social media platforms, streamlining content management, posting automatically through all platforms and engagement processes.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "project-5",
    year: "2021",
    title: "Real-time Listing Website",
    description:
      "Designed and engineered a real-time product listing web app with a responsive, SEO-friendly design, integrated chat, strong security, and scalable clean code. Features include localization (RTL support), filtering, search, pagination, and image optimization.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
  },
]

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

export const Projects = () => {
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
        Projects Timeline
      </motion.h2>
      <motion.p
        className="text-light/80 mb-12 max-w-2xl"
        variants={itemVariants}
      >
        Explore my journey through the years, from my earlier projects to my
        latest work. Each point on the timeline represents a significant project
        I've built.
      </motion.p>

      <motion.div
        className="mt-8 w-full flex justify-center"
        variants={itemVariants}
      >
        <div className="w-full flex items-start">
          <Timeline data={projectsData} />
        </div>
      </motion.div>
    </motion.div>
  )
}
