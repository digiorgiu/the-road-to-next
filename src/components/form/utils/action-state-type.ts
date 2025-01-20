export type ActionState = {
    message: string
    fieldErrors: Record<string, string[] | undefined>
    payload: FormData
    status?: "SUCCESS" | "ERROR"
}