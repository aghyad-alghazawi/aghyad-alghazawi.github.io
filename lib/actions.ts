"use server"

import { redirect } from "next/navigation"
import type { z } from "zod"

import { ContactFormSchema } from "@/lib/schemas"

type Inputs = z.infer<typeof ContactFormSchema>

export async function formAction(data: Inputs) {
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const endpoint = process.env.BASIN_ENDPOINT as string

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("An error occurred. Please try again.")
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "An error occurred. Please try again."
    return { error: errorMessage }
  }

  redirect("/thank-you")
}
