"use client"

import React, { ReactNode } from "react"

import { ModalProvider } from "@/components/ui/modal"

export function Provider({ children, ...props }: { children: ReactNode }) {
  return (
    <React.Fragment {...props}>
      <ModalProvider>{children}</ModalProvider>
    </React.Fragment>
  )
}
