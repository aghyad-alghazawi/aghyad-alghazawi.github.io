"use client"

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { X } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"

import { useEscapeKey, useOutsideClick } from "@/lib/hooks"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

interface ModalContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const { setOpen } = useModal()
  return (
    <Button
      title={"Open"}
      onClick={() => setOpen(true)}
      className={className}
      children={children}
    />
  )
}

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const { open, setOpen } = useModal()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [open])

  useEscapeKey(() => setOpen(false))
  useOutsideClick(modalRef, () => setOpen(false))

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return
    const { left, top, width, height } =
      modalRef.current.getBoundingClientRect()

    // Calculate rotation values
    let x = (e.clientX - left - width / 2) / 60
    let y = (e.clientY - top - height / 2) / 60

    // Clamp the rotation to avoid extreme values
    x = Math.max(Math.min(x, 15), -15)
    y = Math.max(Math.min(y, 15), -15)

    modalRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
  }

  const handleMouseLeave = () => {
    if (!modalRef.current) return
    modalRef.current.style.transition = "transform 0.5s ease-out" // Add smooth transition on leave
    modalRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed glass-morph [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-dark relative z-50 flex flex-col flex-1 overflow-hidden",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
            // onMouseMove={handleMouseMove}
            // onMouseLeave={handleMouseLeave}
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
              backfaceVisibility: "hidden",
              willChange: "transform",
              boxShadow: "0 10px 10px hsl(var(--dark) / 0.5)",
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 p-8 md:p-10 overflow-y-scroll",
        className
      )}
    >
      {children}
    </div>
  )
}

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex justify-end p-4 bg-light/5", className)}>
      {children}
    </div>
  )
}

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        ease: "easeInOut",
        duration: 1,
        delay: 0.1,
      }}
      exit={{
        opacity: 0,
      }}
      className={`fixed glass-morph inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
    />
  )
}

const CloseIcon = () => {
  const { setOpen } = useModal()
  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="absolute top-4 right-4 group"
      aria-label="Close modal"
    >
      <X size={24} />
    </button>
  )
}
