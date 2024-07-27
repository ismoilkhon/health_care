"use client"

import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import { UserFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/patient.actions"

import SubmitButton from "../SubmitButton"
import "react-phone-number-input/style.css"
import CustomFormField from "../CustomFormField"

export enum FormFildType {
    INPUT = "input",
    SELECT = "select",
    SKELETON = "skeleton",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox ",
    DATE_PICKER = "datePicker",
    PHONE_INPUT = "phoneInput",
}

const PatientForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    const onSubmit = async ({ name, email, phone, }: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true)

        try {
            const user = { name, email, phone, }

            const newUser = await createUser(user)
            console.log(newUser)

            if (newUser) {
                router.push(`/patients/${newUser.$id}/register`)
            }
        } catch (error) {
            console.log(error)
        }

        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex-1"
            >
                <section className="mb-12 space-y-4 ">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">
                        Schedule your firs appoinment
                    </p>
                </section>

                <CustomFormField
                    control={form.control}
                    name="name"
                    iconAlt="user"
                    label="Full name"
                    placeholder="Ismoil Baxromov"
                    fieldTyle={FormFildType.INPUT}
                    iconSrc="/assets/icons/user.svg"
                />

                <CustomFormField
                    name="email"
                    label="Email"
                    iconAlt="email"
                    control={form.control}
                    fieldTyle={FormFildType.INPUT}
                    iconSrc="/assets/icons/email.svg"
                    placeholder="ismoilkhon.bakhromov@mail.ru"
                />

                <CustomFormField
                    name="phone"
                    label="Phone number"
                    control={form.control}
                    placeholder="+998(99)977-79-28"
                    fieldTyle={FormFildType.PHONE_INPUT}
                />

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm
