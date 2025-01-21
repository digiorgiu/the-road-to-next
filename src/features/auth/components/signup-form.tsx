"use client"

import { LucideLoader } from "lucide-react";
import { useActionState } from "react";

import Form from "@/components/form/form";
import FormError from "@/components/form/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import signUp from "../actions/signup";

export default function SignUpForm() {
    const [actionState, signUpAction, isPending] = useActionState(signUp, {
        message: "",
        fieldErrors: {},
        payload: new FormData()
    })

    return (
        <Form action={signUpAction} actionState={actionState} classNames="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" defaultValue={(actionState.payload.get("username") as string || "")} />
                <FormError name="username" fieldErrors={actionState.fieldErrors} />
            </div>
            <div className="flex w-full flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={(actionState.payload.get("email") as string || "")} />
                <FormError name="email" fieldErrors={actionState.fieldErrors} />
            </div>

            <div className="flex w-full flex-col gap-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" defaultValue={(actionState.payload.get("password") as string || "")} />
                <FormError name="password" fieldErrors={actionState.fieldErrors} />
            </div>
            <div className="flex w-full flex-col gap-1">
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" defaultValue={(actionState.payload.get("confirmPassword") as string || "")} />
                <FormError name="confirmPassword" fieldErrors={actionState.fieldErrors} />
            </div>
            <Button disabled={isPending} type="submit">{
                <>
                    {isPending && <LucideLoader className="mr-2 size-4 animate-spin" />}
                    Sign Up
                </>
            }
            </Button>
        </Form>
    )
}