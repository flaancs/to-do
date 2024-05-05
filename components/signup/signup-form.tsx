"use client";
import { Label } from "@components/shared/label";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useSignup } from "@hooks/signup/use-signup";
import { useTranslations } from "next-intl";
import { FieldError } from "../shared/field-error";

export function SignupForm() {
    const t = useTranslations();
    const {
        handleSubmit,
        register,
        onSubmit,
        isSubmitting,
        errors,
        touchedFields,
    } = useSignup();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    title={t("fields.name.label")}
                    required
                    requiredText={t("fields.name.required")}
                    htmlFor="name"
                />
                <Input
                    id="name"
                    placeholder={t("fields.name.placeholder")}
                    {...register("name")}
                />
                <FieldError
                    error={errors.name?.message}
                    touched={touchedFields.name}
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
            <div className="space-y-2">
                <Label
                    title={t("fields.passwordConfirm.label")}
                    required
                    requiredText={t("fields.passwordConfirm.required")}
                    htmlFor="confirm-password"
                />
                <Input
                    id="confirm-password"
                    type="password"
                    placeholder={t("fields.passwordConfirm.placeholder")}
                    {...register("passwordConfirm")}
                />
                <FieldError
                    error={errors.passwordConfirm?.message}
                    touched={touchedFields.passwordConfirm}
                />
            </div>
            <Button
                className="w-full"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
            >
                {t("signup.submit")}
            </Button>
        </form>
    );
}
