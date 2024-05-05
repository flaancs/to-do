import { LoginForm } from "@components/login/login-form";
import { SocialButtons } from "@components/shared/social-buttons";
import { Separator } from "@components/ui/separator";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Login() {
    const t = await getTranslations();
    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">{t("login.title")}</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    {t("login.description")}
                </p>
            </div>
            <LoginForm />
            <div className="mt-2">
                <Link
                    href="/auth/signup"
                    className="text-sm underline-offset-2 hover:underline"
                >
                    {t("login.signup")}
                </Link>
            </div>
            <Separator className="my-8" />
            <SocialButtons action={t("login.submit")} />
        </div>
    );
}
