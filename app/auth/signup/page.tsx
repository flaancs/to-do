import { GoogleButton } from "@/components/shared/google-button";
import { SignupForm } from "@/components/signup/signup-form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Signup() {
    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your information to create an account
                </p>
            </div>
            <SignupForm />
            <div className="mt-2">
                <Link
                    href="/auth/login"
                    className="text-sm underline-offset-2 hover:underline"
                >
                    Already have an account? Login
                </Link>
            </div>
            <Separator className="my-8" />
            <div className="space-y-4">
                <GoogleButton action="Sign up" />
            </div>
        </div>
    );
}
