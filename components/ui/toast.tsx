"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

// Custom hook for managing toast state
const useToast = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")

  const showToast = (msg: string, duration = 3000) => {
    setMessage(msg)
    setIsVisible(true)

    setTimeout(() => {
      setIsVisible(false)
    }, duration)
  }

  return { isVisible, message, showToast }
}

// Toast component props
interface ToastProps {
  message: string
  isVisible: boolean
}

// Toast component
const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-8 right-8 bg-dark/80 text-light border border-transparent hover:gradient-border shadow-lg px-4 py-3 z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Toast, useToast }
