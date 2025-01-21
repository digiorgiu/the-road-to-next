import useFormFeedback from "./hooks/use-form-feedback"
import { ActionState } from "./utils/action-state-type"

type FormProps = {
    action: (payload: FormData) => void
    actionState: ActionState
    children: React.ReactNode
    classNames: string
    onSuccess?: () => void
}

export default function Form({ action, actionState, children, classNames, onSuccess }: FormProps) {
    useFormFeedback(actionState, onSuccess)
    return (
        <form action={action} className={classNames}>
            {children}
        </form>
    )
}