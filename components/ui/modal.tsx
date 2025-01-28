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

import Styles from "@/styles/modules/modal.module.css"

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
    <Button title={"Open"} onClick={() => setOpen(true)} className={className}>
      {children}
    </Button>
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

  useOutsideClick(modalRef as React.RefObject<HTMLDivElement>, () =>
    setOpen(false)
  )

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, display: "none" }}
          className="fixed glass-morph [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center p-4 sm:p-6"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              `${Styles["modal-body"]} min-h-[200px] w-full max-h-[90vh] 
              md:max-w-[90%] lg:max-w-[75%] xl:max-w-[40%] 
              z-50 relative flex flex-col flex-1`,
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
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
              backfaceVisibility: "hidden",
              willChange: "transform",
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
        "flex flex-col flex-1 p-4 sm:p-6 md:p-8 bg-dark/85 overflow-y-auto",
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
    <div
      className={cn(
        "flex flex-col sm:flex-row justify-end gap-2 p-3 sm:p-4 bg-dark/75",
        className
      )}
    >
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
      className="absolute top-4 right-4 group hover:animate-flicker"
      aria-label="Close modal"
    >
      <X size={24} />
    </button>
  )
}
