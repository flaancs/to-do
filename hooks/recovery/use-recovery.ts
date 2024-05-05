import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@lib/api-client";
import { handleRedirect } from "@lib/utils";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
            handleRedirect("/auth/login");
        },
        onError: (error) => {
            toast({
                title: t("common.error"),
                description: error.message,
            });
        },
    });

    const recoveryPasswordSchema = useMemo(
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

    type FormValues = z.infer<typeof recoveryPasswordSchema>;

    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors, touchedFields },
    } = useForm<FormValues>({
        resolver: zodResolver(recoveryPasswordSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async ({
        password,
        passwordConfirm,
    }) => {
        const token = searchParams.get("token") as string;
        await setPasswordMutation.mutateAsync({
            token,
            password: password,
            passwordConfirm: passwordConfirm,
        });
    };

    return {
        handleSubmit,
        register,
        onSubmit,
        isSubmitting,
        errors,
        touchedFields,
    };
};
