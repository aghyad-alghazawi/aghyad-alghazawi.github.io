import React, { JSX } from "react"
import { Icon } from "@phosphor-icons/react"

import Styles from "@/styles/modules/button.module.css"

type DefaultProps = JSX.IntrinsicElements["button"]

interface ButtonProps extends DefaultProps {
  variant?: "primary" | "secondary" | "danger"
  size?: "small" | "medium" | "large"
  title: string
  icon?: Icon
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "medium", title, icon: Icon, ...props },
    ref
  ) => {
    const className = `${Styles.button} ${Styles[variant]} ${Styles[size]}`

    return (
      <button type={"button"} className={className} ref={ref} {...props}>
        {title}
        {Icon && (
          <span className={Styles.icon}>
            <Icon size={24}/>
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
