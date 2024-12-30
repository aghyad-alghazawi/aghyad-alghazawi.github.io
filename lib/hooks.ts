import { RefObject, useEffect } from "react"

// Type for the callback function that takes an event parameter
type OutsideClickCallback = (event: MouseEvent | TouchEvent) => void

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
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
