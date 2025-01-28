import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

import { Social } from "@/lib/types"

import SingulartifyLogo from "@/components/icons/singulartify"

const LINKS: Social[] = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/aghyad-alghazawi/",
    icon: LinkedinLogo,
  },
  {
    title: "GitHub",
    href: "https://www.github.com/aghyad-alghazawi",
    icon: GithubLogo,
  },
  {
    title: "Singulartify",
    href: "https://www.singulartify.com",
    icon: SingulartifyLogo,
  },
]

export { LINKS }
