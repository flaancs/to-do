import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@lib/api-client";
import { handleRedirect } from "@lib/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const useSignup = () => {
    const t = useTranslations();
    const { toast } = useToast();

    const signupMutation = apiClient.auth.signup.useMutation({
        onSuccess: ({ result }) => {
            toast({
                title: t("signup.notifications.success.title"),
                description: t("signup.notifications.success.message"),
            });
            handleRedirect(`/auth/login?email=${result}`);
        },
        onError: (error) => {
            toast({
                title: "An error occurred",
                description: error.message,
            });
        },
    });

    const signupSchema = useMemo(
        () =>
            z
                .object({
                    email: z
                        .string({
                            required_error: t("fields.email.required"),
                        })
                        .email(t("fields.email.invalid"))
                        .max(255, t("fields.email.maxLength")),
                    name: z
                        .string({
                            required_error: t("fields.name.required"),
                        })
                        .min(3, t("fields.name.minLength"))
                        .max(255, t("fields.name.maxLength")),
                    password: z
                        .string({
                            required_error: t("fields.password.required"),
                        })
                        .min(8, t("fields.password.minLength"))
                        .max(255, t("fields.password.maxLength")),
                    passwordConfirm: z
                        .string({
                            required_error: t("fields.password.required"),
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

    type FormValues = z.infer<typeof signupSchema>;

    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors, touchedFields },
    } = useForm<FormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async ({
        email,
        name,
        password,
        passwordConfirm,
    }) => {
        await signupMutation.mutateAsync({
            email: email,
            name: name,
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
