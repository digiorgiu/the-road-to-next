import { LucideSearchX } from "lucide-react"

type PlaceholderProps = {
    label: string
    icon?: React.ReactElement
    button?: React.ReactElement
}

export default function Placeholder({
    label, 
    icon = <LucideSearchX className="size-10" />, 
    button = <div className="h-10" />
}: PlaceholderProps) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
            {icon}
            <p className="text-2xl font-bold">{label}</p>
            {button}
        </div>
    )
}