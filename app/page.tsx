"use client"

import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { Carousel } from "@/components/ui/carousel"
import { Form } from "@/components/blocks/form"
import { Hero } from "@/components/blocks/hero"
import { Projects } from "@/components/blocks/projects"
import { Stack } from "@/components/blocks/stack"
import { Stats } from "@/components/blocks/stats"
import { Shader } from "@/components/shader"

import Styles from "@/styles/modules/page.module.css"

export default function Page() {
  return (
    <>
      <section className={Styles.overlay}>
        <Shader />
        <div className={"hidden fixed h-full w-full"} />
      </section>
      <section className={cn(Styles.left)}>
        <div className={Styles.layer}>
          <svg viewBox="0 0 820 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="0,0 779.335,0 799.901,82.588 649.446,389.647 767.429,505.059 618.056,785.647 820,1080 0,1080"
              fill="#06010c"
              fillOpacity="0.25"
              filter="url(#blur-strong)"
            />
          </svg>
        </div>
        <div className={Styles.layer}>
          <svg viewBox="0 0 820 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="0,0 737.373,0 660.563,147.176 764,414 674.901,618.353 751.71,724.235 737.373,1080 0,1080"
              fill="#06010c"
              fillOpacity="0.5"
              filter="url(#blur-weak)"
            />
          </svg>
        </div>
        <div className={Styles.layer}>
          <svg viewBox="0 0 820 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="0,0 676.425,0 717.464,140.824 590.791,353.647 732,640.588 585.6,796.471 676.425,1080 0,1080"
              fill="#06010c"
              fillOpacity="0.75"
            />
          </svg>
        </div>
        <div className={Styles.avatar}>
          <div className="hidden mobile:block">
            <Image
              src="/images/profile-mobile.webp"
              alt="AA"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className={cn(Styles.layer)}>
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
            <image
              // className={"block mobile:hidden"}
              href="/images/profile.webp"
              height={"100%"}
              clipPath="url(#clip-polygon)"
            />
            <path
              className={cn(Styles.stroke, "block mobile:hidden")}
              d="M580,0 L610,60 L540,460 L600,520 L620,800 L550,1080"
              fill="none"
              stroke="white"
              strokeWidth={3}
            />
          </svg>
        </div>
      </section>
      <section className={Styles.center}>
        <div className={Styles.hero}>
          <Carousel>
            <div className={Styles.card}>
              <Hero />
            </div>
            <div className={Styles.card}>
              <Stats />
            </div>
            <div className={Styles.card}>
              <Projects />
            </div>
            <div className={Styles.card}>
              <Stack />
            </div>
          </Carousel>
        </div>
      </section>
      <section className={cn(Styles.right)}>
        <div className={Styles.layer}>
          <svg viewBox="-20 0 200 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="45.535,0 200,0 200,1080 81.245,1080 21,966 66.667,576 14.359,495 92.308,338 0,281 45.535,0"
              fill="#06010c"
              fillOpacity="0.25"
              filter="url(#blur-strong)"
            />
          </svg>
        </div>
        <div className={Styles.layer}>
          <svg viewBox="-20 0 200 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="67.709,0 200,0 200,1080 51.062,1080 68,910 25,758 123.503,626 35.479,380 70.060,195 67.709,0"
              fill="#06010c"
              fillOpacity="0.5"
              filter="url(#blur-weak)"
            />
          </svg>
        </div>
        <div className={Styles.layer}>
          <svg viewBox="-20 0 200 1080" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="128.519,0 200,0 200,1080 77.884,1080 135.855,959 67.763,642 154.605,457 50,191 128.519,0"
              fill="#06010c"
              fillOpacity="0.75"
            />
          </svg>
        </div>
      </section>
    </>
  )
}
