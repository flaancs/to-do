import { LoginForm } from "@components/login/login-form";
import { GoogleButton } from "@components/shared/google-button";
import { Separator } from "@components/ui/separator";
import Link from "next/link";

export default function Login() {
    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your email and password to access your account
                </p>
            </div>
            <LoginForm />
            <div className="mt-2">
                <Link
                    href="/auth/signup"
                    className="text-sm underline-offset-2 hover:underline"
                >
                    Don&apos;t have an account? Sign up
                </Link>
            </div>
            <Separator className="my-8" />
            <GoogleButton action="Sign in" />
        </div>
    );
}
