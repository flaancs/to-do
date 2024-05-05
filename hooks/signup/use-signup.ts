import { useToast } from "@components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { handleRedirect } from "@lib/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const useSignup = () => {
    const t = useTranslations();
    const { toast } = useToast();

    const signupMutation = apiClient.auth.signup.useMutation({
        onSuccess: () => {
            handleRedirect("/todos");
        },
        onError: (error) => {
            toast({
                title: "An error occurred",
                description: error.message,
            });
        },
    });

    const SignupSchema = useMemo(
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

    const signupFormSchema = useMemo(
        () => toFormikValidationSchema(SignupSchema),
        [SignupSchema],
    );

    const handleSubmit = async (values: {
        email: string;
        name: string;
        password: string;
        passwordConfirm: string;
    }) => {
        await signupMutation.mutateAsync({
            email: values.email,
            name: values.name,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
        });
    };

    return {
        handleSubmit,
        signupMutation,
        signupFormSchema,
    };
};
