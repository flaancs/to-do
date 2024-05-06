"use client";
import { FieldError } from "@components/shared/field-error";
import { Label } from "@components/shared/label";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useLogin } from "@hooks/login/use-login";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function LoginForm() {
    const t = useTranslations();
    const {
        handleSubmit,
        onSubmit,
        register,
        errors,
        touchedFields,
        isLoadingLogin,
    } = useLogin();

    return (
        <form
            data-testid="login-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <div className="space-y-2">
                <Label
                    title={t("fields.email.label")}
                    required
                    requiredText={t("fields.email.required")}
                    htmlFor="email"
                />
                <Input
                    id="email"
                    placeholder={t("fields.email.placeholder")}
                    type="email"
                    {...register("email")}
                />
                <FieldError
                    error={errors.email?.message}
                    touched={touchedFields.email}
                />
            </div>
            <div className="space-y-2">
                <Label
                    title={t("fields.password.label")}
                    required
                    requiredText={t("fields.password.required")}
                    htmlFor="password"
                />
                <Input
                    id="password"
                    type="password"
                    placeholder={t("fields.password.placeholder")}
                    {...register("password")}
                />
                <FieldError
                    error={errors.password?.message}
                    touched={touchedFields.password}
                />
            </div>
            <div className="flex justify-end">
                <Link
                    data-testid="login-forgot-link"
                    href="/auth/forgot"
                    className="text-sm underline-offset-2 hover:underline"
                >
                    {t("login.forgot")}
                </Link>
            </div>
            <Button
                className="w-full"
                type="submit"
                loading={isLoadingLogin}
                disabled={isLoadingLogin}
            >
                {t("login.submit")}
            </Button>
        </form>
    );
}
