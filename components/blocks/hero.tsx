import { DownloadSimple } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { FlipWords } from "@/components/ui/flip-words"
import { Materialize } from "@/components/ui/materialize"

import Styles from "@/styles/modules/page.module.css"

const spacer = "\u2000"
const words = [
  `SOFTWARE${spacer}ENGINEER`,
  `UI/UX${spacer}DESINGER`,
  `FULL-STACK${spacer}DEVELOPER`,
]
const Hero = () => {
  return (
    <>
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
        <p
          className={
            "text-responsive font-inter font-extralight italic mt-10 drop-shadow-lg"
          }
        >
          With a focus on seamless functionality and design, <br /> I thrive in
          bringing complex ideas to life. <br />
          Let&apos;s collaborate to turn your vision into{" "}
          <span className={"text-light"}>reality!</span>
        </p>
      </div>
      <div className={Styles.action}>
        <Button
          title={"CONTACT"}
          variant={"primary"}
          size={"responsive"}
          onClick={() => {
            window.location.href = "mailto:aghyad.alghazawi@gmail.com"
          }}
        />
        <Button
          title={"CV"}
          icon={DownloadSimple}
          variant={"secondary"}
          size={"responsive"}
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
    </>
  )
}

export { Hero }