import { LucideLoader } from "lucide-react";

export default function Spinner() {
    return(
        <div className="flex flex-1 items-center justify-center">
            <LucideLoader className="size-16 animate-spin" />
        </div>
    )
}