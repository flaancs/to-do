import { useToast } from "@components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { handleRedirect } from "@lib/utils";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const useRecovery = () => {
    const t = useTranslations();
    const { toast } = useToast();
    const searchParams = useSearchParams();

    const setPasswordMutation = apiClient.auth.setPassword.useMutation({
        onSuccess: () => {
            toast({
                title: t("recovery.notifications.success.title"),
                description: t("recovery.notifications.success.message"),
            });
            handleRedirect("/todos");
        },
        onError: (error) => {
            toast({
                title: t("common.error"),
                description: error.message,
            });
        },
    });

    const RecoveryPasswordSchema = useMemo(
        () =>
            z
                .object({
                    password: z
                        .string({
                            required_error: t("fields.password.required"),
                        })
                        .min(8, t("fields.password.minLength"))
                        .max(255, t("fields.password.maxLength")),
                    passwordConfirm: z
                        .string({
                            required_error: t(
                                "fields.passwordConfirm.required",
                            ),
                        })
                        .min(8, t("fields.password.minLength"))
                        .max(255, t("fields.password.maxLength")),
                })
                .refine((data) => data.password === data.passwordConfirm, {
                    message: t("fields.passwordConfirm.mismatch"),
                    path: ["passwordConfirm"],
                }),
        [t],
    );

    const recoveryPasswordFormValidationSchema = useMemo(
        () => toFormikValidationSchema(RecoveryPasswordSchema),
        [RecoveryPasswordSchema],
    );

    const handleSubmit = async (values: {
        password: string;
        passwordConfirm: string;
    }) => {
        const token = searchParams.get("token") as string;
        await setPasswordMutation.mutateAsync({
            token,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
        });
    };

    return {
        handleSubmit,
        setPasswordMutation,
        recoveryPasswordFormValidationSchema,
    };
};
