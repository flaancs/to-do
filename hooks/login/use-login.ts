import { useToast } from "@components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { handleRedirect } from "@lib/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const useLogin = () => {
    const t = useTranslations();
    const { toast } = useToast();

    const loginMutation = apiClient.auth.login.useMutation({
        onSuccess: () => {
            handleRedirect("/todos");
        },
        onError: () => {
            toast({
                title: t("login.notifications.error.title"),
                description: t("login.notifications.error.message"),
            });
        },
    });

    const LoginSchema = useMemo(
        () =>
            z.object({
                email: z
                    .string({
                        required_error: t("fields.email.required"),
                    })
                    .email(t("fields.email.invalid"))
                    .max(255, t("fields.email.maxLength")),
                password: z.string({
                    required_error: t("fields.password.required"),
                }),
            }),
        [t],
    );

    const loginFormSchema = useMemo(
        () => toFormikValidationSchema(LoginSchema),
        [LoginSchema],
    );

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        await loginMutation.mutateAsync({
            email: values.email,
            password: values.password,
        });
    };

    return {
        handleSubmit,
        loginMutation,
        loginFormSchema,
    };
};
