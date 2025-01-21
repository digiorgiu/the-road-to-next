"use client"

import { User } from "@prisma/client";
import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import signOut from "@/features/auth/actions/signout";
import { getCurrentSession } from "@/lib/auth/get-current-session";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";

import LoadingButton from "./loading-button";
import ThemeSwitcher from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";


export default function Header() {
    const [user, setUser] = useState<User | null>(null)
    const [isFetched, setIsFetched] = useState<boolean>(false)
    const pathname = usePathname()
    useEffect(() => {
        const getUser = async () => {
            setIsFetched(false)
            const { user } = await getCurrentSession()
            setUser(user)
            setIsFetched(true)
        }
        getUser()
    }, [pathname])

    if (!isFetched) {
        return null
    }

    return (
        <>

            <div>
                <Link className={buttonVariants({ variant: "ghost" })} href={homePath()}>
                    <LucideKanban />
                    <h1 className="text-lg font-semibold">TicketBounty</h1>
                </Link>
            </div>
            {user ? (
                <div className="flex items-center gap-1">
                    <ThemeSwitcher />
                    <Link className={buttonVariants({ variant: "outline" })} href={ticketsPath()}>Tickets</Link>
                    <form action={signOut}>
                        <LoadingButton label="Sign Out" />
                    </form>
                </div>
            ) : (
                <div className="flex items-center gap-1">
                    <ThemeSwitcher />
                    <Link className={buttonVariants({ variant: "default" })} href={signUpPath()}>Sign Up</Link>
                    <Link className={buttonVariants({ variant: "outline" })} href={signInPath()}>Sign In</Link>
                </div>
            )}

        </>
    )
}