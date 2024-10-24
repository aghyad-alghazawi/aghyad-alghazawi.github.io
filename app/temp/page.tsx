"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { FlipWords } from "@/components/ui/flip-words"
import { Materialize } from "@/components/ui/materialize"
import { useModal } from "@/components/ui/modal"
import { Aurora } from "@/components/aurora"
import { Form } from "@/components/form"

import Styles from "@/styles/modules/page.module.css"

export default function Page() {
  const [showResume, setShowResume] = useState(false)
  const { open, setOpen } = useModal()

  const spacer = "\u2000"
  const words = [
    `SOFTWARE${spacer}ENGINEER`,
    `UI/UX${spacer}DESINGER`,
    `FULL-STACK${spacer}DEVELOPER`,
  ]

  // Framer Motion variants for sliding layers
  const slideInVariant = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: "spring",
      },
    },
  })

  const slideInVariantRight = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: "spring",
      },
    },
  })

  // Updated Framer Motion variant for the center section
  const centerVariant = {
    hidden: { opacity: 0, display: "none" },
    visible: {
      display: "flex",
      opacity: 1,
      transition: {
        delay: 1.6,
        duration: 1,
        ease: "easeInOut",
      },
    },
  }

  return (
    <>
      <section className={Styles.overlay}>
        <Aurora />
        <div className={"hidden fixed h-full w-full"} />
      </section>

      {/* Left section with layered animation */}
      <motion.section className={Styles.left}>
        <motion.div
          className={Styles.layer}
          initial="hidden"
          animate="visible"
          variants={slideInVariant(0)} // First layer
        >
          <svg viewBox="0 0 820 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="0,0 779.335,0 799.901,82.588 649.446,389.647 767.429,505.059 618.056,785.647 820,1080 0,1080"
              fill="#06010c"
              fillOpacity="0.25"
              filter="url(#blur-strong)"
            />
          </svg>
        </motion.div>
        <motion.div
          className={Styles.layer}
          initial="hidden"
          animate="visible"
          variants={slideInVariant(0.4)} // Second layer
        >
          <svg viewBox="0 0 820 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="0,0 737.373,0 660.563,147.176 764,414 674.901,618.353 751.71,724.235 737.373,1080 0,1080"
              fill="#06010c"
              fillOpacity="0.5"
              filter="url(#blur-weak)"
            />
          </svg>
        </motion.div>
        <motion.div
          className={Styles.layer}
          initial="hidden"
          animate="visible"
          variants={slideInVariant(0.8)} // Third layer
        >
          <svg viewBox="0 0 820 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="0,0 676.425,0 717.464,140.824 590.791,353.647 732,640.588 585.6,796.471 676.425,1080 0,1080"
              fill="#06010c"
              fillOpacity="0.75"
            />
          </svg>
        </motion.div>

        {/* Fourth layer that syncs with the center section */}
        <div className={Styles.layer}>
          <svg
            id={"profile"}
            viewBox="0 0 820 1080"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="blur-strong">
                <feGaussianBlur stdDeviation="6" in="SourceGraphic" />
              </filter>
              <filter id="blur-weak">
                <feGaussianBlur stdDeviation="3" />
              </filter>
              <clipPath id="clip-polygon">
                <polygon points="0,0 580,0 610,60 540,460 600,520 620,800 550,1080 0,1080 0,0" />
              </clipPath>
            </defs>
            <motion.image
              initial="hidden"
              animate="visible"
              variants={centerVariant}
              className={Styles.profile}
              href="/images/profile.webp"
              height={"100%"}
              clipPath="url(#clip-polygon)"
            />
            <motion.path
              initial="hidden"
              animate="visible"
              variants={centerVariant}
              className={Styles.stroke}
              d="M580,0 L610,60 L540,460 L600,520 L620,800 L550,1080"
              fill="none"
              stroke="white"
              strokeWidth={3}
            />
          </svg>
        </div>
      </motion.section>

      {/* Center section with fade-in animation */}
      <motion.section
        className={Styles.center}
        initial="hidden"
        animate="visible"
        variants={centerVariant}
      >
        <div className={Styles.hero}>
          <div className={Styles.text}>
            <h1 className={"text-2xl font-monts font-light leading-relaxed"}>
              <FlipWords words={words} />
            </h1>
            <span
              className={
                "flex text-7xl font-monts font-bold leading-none tracking-tight"
              }
            >
              <Materialize svgUrl={"/assets/name.svg"} />
            </span>
            <p className={"text-xl font-inter font-thin mt-10"}>
              With a focus on seamless functionality and design, I thrive in
              bringing complex ideas to life. Let&apos;s collaborate to turn
              your vision into reality
            </p>
          </div>
          <div className={Styles.action}>
            <Button
              title={"CONTACT"}
              variant={"primary"}
              size={"large"}
              onClick={() => setOpen(true)}
            />
            <Button
              title={"ABOUT ME"}
              variant={"secondary"}
              size={"large"}
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/assets/resume.pdf"
                link.download = "Aghyad's Resume.pdf"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            />
          </div>
          {showResume && (
            <iframe
              src="/assets/resume.pdf"
              className="fixed z-50 pointer-events-auto mt-4 w-full h-[80vh] border-2 border-light rounded-lg shadow-lg"
              title="Resume"
            />
          )}
        </div>
      </motion.section>

      {/* Right section with layered animation */}
      <motion.section className={Styles.right}>
        <motion.div
          className={Styles.layer}
          initial="hidden"
          animate="visible"
          variants={slideInVariantRight(0)} // First layer
        >
          <svg viewBox="-20 0 200 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="45.535,0 200,0 200,1080 81.245,1080 21,966 66.667,576 14.359,495 92.308,338 0,281 45.535,0"
              fill="#06010c"
              fillOpacity="0.25"
              filter="url(#blur-strong)"
            />
          </svg>
        </motion.div>
        <motion.div
          className={Styles.layer}
          initial="hidden"
          animate="visible"
          variants={slideInVariantRight(0.4)} // Second layer
        >
          <svg viewBox="-20 0 200 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="67.709,0 200,0 200,1080 51.062,1080 68,910 25,758 123.503,626 35.479,380 70.060,195 67.709,0"
              fill="#06010c"
              fillOpacity="0.5"
            />
          </svg>
        </motion.div>
        <motion.div
          className={Styles.layer}
          initial="hidden"
          animate="visible"
          variants={slideInVariantRight(0.8)} // Third layer
        >
          <svg viewBox="-20 0 200 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="128.519,0 200,0 200,1080 77.884,1080 135.855,959 67.763,642 154.605,457 50,191 128.519,0"
              fill="#06010c"
              fillOpacity="0.75"
            />
          </svg>
        </motion.div>
      </motion.section>

      <section className={Styles.modal}>
        <Form />
      </section>
    </>
  )
}