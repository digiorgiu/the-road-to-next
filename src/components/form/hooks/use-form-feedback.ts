"use client"

import { useEffect } from "react";
import { toast } from "sonner";

import { ActionState } from "../utils/action-state-type";

export default function useFormFeedback(actionState: ActionState, onSuccess?: () => void) {
    useEffect(() => {
        if (!actionState.message) return
        if (actionState.status && actionState.status === "SUCCESS") {
            onSuccess?.()
            toast.success(actionState.message)
        }
        if (actionState.status && actionState.status === "ERROR") {
            toast.error(actionState.message)
        }
    }, [actionState, onSuccess])
}