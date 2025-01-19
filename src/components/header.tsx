import { LucideKanban } from "lucide-react";
import Link from "next/link";

import { homePath, ticketsPath } from "@/paths";

import ThemeSwitcher from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";

export default function Header() {
    return (
        <>
            <div>
                <Link className={buttonVariants({ variant: "ghost" })} href={homePath()}>
                    <LucideKanban />
                    <h1 className="text-lg font-semibold">TicketBounty</h1>
                </Link>
            </div>
            <div className="flex items-center gap-1">
                <ThemeSwitcher />
                <Link className={buttonVariants({ variant: "outline" })} href={ticketsPath()}>Tickets</Link>
            </div>
        </>
    )
}