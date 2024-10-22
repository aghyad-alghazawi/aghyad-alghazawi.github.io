import React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const gradientBorderStyle = {
      borderImage:
        "linear-gradient(to right, hsl(var(--light) / 1), hsl(var(--royal-purple) / 1), hsl(var(--electric-blue) / 1), hsl(var(--marian-blue) / 1), hsl(var(--amethyst) / 1), hsl(var(--blue-green) / 1), hsl(var(--light) / 1)) 1",
    }

    return (
      <input
        type={type}
        style={gradientBorderStyle}
        className={cn(
          "flex h-9 w-full bg-light px-3 py-1 text-sm text-dark selection:text-light selection:bg-[hsl(var(--electric-blue))] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-dark/50 focus-visible:outline-none focus-visible:border-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
