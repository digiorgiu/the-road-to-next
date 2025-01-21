import Link from "next/link";

import CardCompact from "@/components/card-compact";
import SignUpForm from "@/features/auth/components/signup-form";
import { signInPath } from "@/paths";

export default function SignUp() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-8">
            <CardCompact
                title="Sign Up"
                description="Create an account to start hunting bounty"
                classNames="w-full max-w-[428px] self-center"
                content={<SignUpForm />}
                footer={<div className="text-sm">Do you already have an account? <Link className="text-primary" href={signInPath()}>Sign In</Link></div>}
            />
        </div>
    )
}