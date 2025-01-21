import { ZodError } from "zod";

import { ActionState } from "./action-state-type";

export default function fromErrorToActionState(error: unknown, payload: FormData): ActionState {
    if (error instanceof ZodError) {
        const fieldErrors = error.flatten().fieldErrors
        return {
            message: "",
            fieldErrors,
            payload,
            status: "ERROR"
        }
    } else if (error instanceof Error) {
        return {
            message: error.message,
            fieldErrors: {},
            payload,
            status: "ERROR"
        }
    }
    else {
        return {
            message: "Something wrong happend",
            fieldErrors: {},
            payload,
            status: "ERROR"
        }
    }
}