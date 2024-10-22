import React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const gradientBorderStyle = {
      borderImage:
        "linear-gradient(to right, hsl(var(--light) / 1), hsl(var(--royal-purple) / 1), hsl(var(--electric-blue) / 1), hsl(var(--marian-blue) / 1), hsl(var(--amethyst) / 1), hsl(var(--blue-green) / 1), hsl(var(--light) / 1)) 1",
    }

    return (
      <textarea
        style={gradientBorderStyle}
        className={cn(
          "flex min-h-[60px] w-full bg-light px-3 py-2 text-dark text-sm shadow-sm selection:text-light selection:bg-[hsl(var(--electric-blue))] placeholder:text-dark/50 focus-visible:border-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
