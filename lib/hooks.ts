import { useEffect } from "react"

// Type for the callback function that takes an event parameter
type OutsideClickCallback = (event: MouseEvent | TouchEvent) => void

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: OutsideClickCallback
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      callback(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, callback])
}

type EscapeKeyCallback = () => void

export const useEscapeKey = (callback: EscapeKeyCallback) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [callback])
}
