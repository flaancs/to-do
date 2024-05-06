import { SocialButtons } from "@components/shared/social-buttons";
import { SignupForm } from "@components/signup/signup-form";
import { Separator } from "@components/ui/separator";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Signup() {
    const t = await getTranslations();
    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold" data-testid="signup-title">
                    {t("signup.title")}
                </h1>
                <p
                    className="text-gray-500 dark:text-gray-400"
                    data-testid="signup-description"
                >
                    {t("signup.description")}
                </p>
            </div>
            <SignupForm />
            <div className="mt-2">
                <Link
                    data-testid="signup-login-link"
                    href="/auth/login"
                    className="text-sm underline-offset-2 hover:underline"
                >
                    {t("signup.login")}
                </Link>
            </div>
            <Separator className="my-8" />
            <div className="space-y-4">
                <SocialButtons action={t("signup.title")} />
            </div>
        </div>
    );
}
