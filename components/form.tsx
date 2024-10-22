"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { formAction } from "@/lib/actions"
import { ContactFormSchema } from "@/lib/schemas"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { ModalBody, ModalContent, ModalFooter } from "./ui/modal"

type Inputs = z.infer<typeof ContactFormSchema>

export function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await formAction(data)

    if (result?.error) {
      console.log(result.error)
      // toast.error(result.error)
      return
    }
  }

  return (
    <ModalBody>
      <form
        noValidate
        onSubmit={handleSubmit(processForm)}
        className={"contents"}
      >
        <ModalContent>
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <div>
            <Input placeholder="Name" {...register("name")} />
            {errors.name?.message && (
              <p className="ml-1 mt-1 text-xs text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email?.message && (
              <p className="ml-1 mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="col-span-full">
            <Textarea rows={5} placeholder="Message" {...register("message")} />
            {errors.message?.message && (
              <p className="ml-1 mt-1 text-xs text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            title={"Submit"}
            variant={"secondary"}
          >
            <span>{isSubmitting ? "Submitting" : "Submit"}</span>
          </Button>
        </ModalFooter>
      </form>
    </ModalBody>
  )
}
