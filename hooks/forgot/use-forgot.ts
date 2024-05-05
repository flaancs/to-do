import { apiClient } from "@lib/api-client";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const useForgot = () => {
    const t = useTranslations();
    const [sent, setSent] = useState(false);

    const forgotPasswordMutation = apiClient.auth.forgot.useMutation({
        onSettled: () => setSent(true),
    });

    const ForgotPasswordSchema = useMemo(
        () =>
            z.object({
                email: z
                    .string({
                        required_error: t("fields.email.required"),
                    })
                    .email(t("fields.email.invalid"))
                    .max(255, t("fields.email.maxLength")),
            }),
        [t],
    );

    const forgotPasswordFormValidationSchema = useMemo(
        () => toFormikValidationSchema(ForgotPasswordSchema),
        [ForgotPasswordSchema],
    );

    const handleSubmit = async (values: { email: string }) => {
        await forgotPasswordMutation.mutateAsync({
            email: values.email,
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSubmit({ email: event.currentTarget.value });
        }
    };

    return {
        sent,
        handleSubmit,
        handleKeyDown,
        forgotPasswordMutation,
        forgotPasswordFormValidationSchema,
    };
};
