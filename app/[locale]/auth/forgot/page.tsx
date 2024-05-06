"use client";
import { FieldError } from "@components/shared/field-error";
import { Label } from "@components/shared/label";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useForgot } from "@hooks/forgot/use-forgot";
import { SendIcon, UndoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Forgot() {
    const t = useTranslations();
    const {
        isSubmitSuccessful,
        handleSubmit,
        register,
        onSubmit,
        isSubmitting,
        errors,
        touchedFields,
    } = useForgot();

    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                {isSubmitSuccessful ? (
                    <SendIcon className="w-16 h-16 mx-auto" />
                ) : (
                    <>
                        <h1
                            className="text-3xl font-bold"
                            data-testid="forgot-title"
                        >
                            {t("forgot.title")}
                        </h1>
                        <p
                            className="text-gray-500 dark:text-gray-400"
                            data-testid="forgot-description"
                        >
                            {t("forgot.description")}
                        </p>
                    </>
                )}
            </div>
            {isSubmitSuccessful ? (
                <p data-testid="forgot-sent-message" className="text-center">{t("forgot.sent")}</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="forgot-form">
                    <div className="space-y-2">
                        <Label
                            required
                            requiredText={t("fields.email.required")}
                            htmlFor="email"
                            title={t("fields.email.label")}
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
                    <Button
                        className="w-full"
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {t("forgot.submit")}
                    </Button>
                    <div className="flex justify-center my-1">
                        <Link data-testid="forgot-login-link" href="/auth/login">{t("signup.goLogin")}</Link>
                    </div>
                </form>
            )}
            {isSubmitSuccessful && (
                <div className="flex justify-center">
                    <Button asChild className="mt-4" data-testid="forgot-login-button">
                        <Link href="/auth/login">
                            <UndoIcon className="mr-2 h-4 w-4" />{" "}
                            {t("signup.goLogin")}
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
