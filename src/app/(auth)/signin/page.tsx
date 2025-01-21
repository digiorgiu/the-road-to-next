import Link from "next/link";

import CardCompact from "@/components/card-compact";
import SignInForm from "@/features/auth/components/signin-form";
import { signUpPath } from "@/paths";

export default function SignIn() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-8">
            <CardCompact
                title="Sign Ip"
                description="Sign In now to start hunting bounty"
                classNames="w-full max-w-[428px] self-center"
                content={<SignInForm />}
                footer={<div className="text-sm">Don&apos;t you have an account? <Link className="text-primary" href={signUpPath()}>Sign Up</Link></div>}
            />
        </div>
    )
}