"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";



// import { formAction } from "@/lib/actions"
import { ContactFormSchema } from "@/lib/schemas";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModalBody, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";





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

  const endpoint = process.env.NEXT_PUBLIC_BASIN_ENDPOINT as string

  const processForm: SubmitHandler<Inputs> = async (data) => {
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

      reset()
    } catch (error: any) {
      return { error: error.message || "An error occurred. Please try again." }
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
          <h1 className="text-3xl font-bold mb-10">Connect with Us</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <div className="col-span-full min-h-[150px]">
              <Textarea
                rows={8}
                placeholder="Message"
                {...register("message")}
              />
              {errors.message?.message && (
                <p className="ml-1 mt-1 text-xs text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            type={"submit"}
            disabled={isSubmitting}
            title={isSubmitting ? "Submitting" : "Submit"}
            variant={"tertiary"}
            style={{
              borderWidth: 1,
              width: "100%",
              textTransform: "uppercase",
            }}
          />
        </ModalFooter>
      </form>
    </ModalBody>
  )
}