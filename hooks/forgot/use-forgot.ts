import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@lib/api-client";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const useForgot = () => {
    const t = useTranslations();

    const forgotPasswordMutation = apiClient.auth.forgot.useMutation();

    const forgotPasswordSchema = useMemo(
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

    type FormValues = z.infer<typeof forgotPasswordSchema>;

    const {
        handleSubmit,
        register,
        formState: { isSubmitting, isSubmitSuccessful, errors, touchedFields },
    } = useForm<FormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async ({ email }) => {
        await forgotPasswordMutation.mutateAsync({
            email: email,
        });
    };

    return {
        isSubmitSuccessful,
        handleSubmit,
        register,
        onSubmit,
        isSubmitting,
        errors,
        touchedFields,
    };
};
