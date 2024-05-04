import { LoginForm } from "@/components/auth/login-form";

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
        </div>
    );
}
