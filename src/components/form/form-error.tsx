type FormErrorProps = {
    name: string
    fieldErrors: Record<string, string[] | undefined> | undefined
}

export default function FormError({ name, fieldErrors }: FormErrorProps) {
    if (!fieldErrors) return null
    return (
        <>
            {fieldErrors[name] && <span className="text-red-500">{fieldErrors[name][0]}</span>}
        </>
    )
}