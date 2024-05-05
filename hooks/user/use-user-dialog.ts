import { useToast } from "@components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { ApiOutput } from "@packages/api";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export interface useUserDialogProps {
    user: ApiOutput["auth"]["user"];
    onUserUpdated: () => void;
}

export const useUserDialog = ({ user, onUserUpdated }: useUserDialogProps) => {
    const t = useTranslations();
    const { toast } = useToast();

    const updateUserMutation = apiClient.auth.update.useMutation({
        onSuccess: () => {
            toast({
                title: t("user.update.notifications.success.title"),
                description: t("user.update.notifications.success.message"),
            });
            onUserUpdated();
        },
        onError: (error) => {
            toast({
                title: t("common.error"),
                description: error.message,
            });
        },
    });

    const UpdateUserSchema = useMemo(
        () =>
            z
                .object({
                    name: z
                        .string({
                            required_error: t("fields.name.required"),
                        })
                        .min(3, t("fields.name.minLength"))
                        .max(255, t("fields.name.maxLength")),
                    password: z
                        .string()
                        .min(8, t("fields.password.minLength"))
                        .max(255, t("fields.password.maxLength"))
                        .optional(),
                    passwordConfirm: z
                        .string()
                        .min(8, t("fields.password.minLength"))
                        .max(255, t("fields.password.maxLength"))
                        .optional(),
                })
                .refine((data) => data.password === data.passwordConfirm, {
                    message: t("fields.passwordConfirm.mismatch"),
                    path: ["passwordConfirm"],
                }),
        [t],
    );

    const updateUserFormValidationSchema = useMemo(
        () => toFormikValidationSchema(UpdateUserSchema),
        [UpdateUserSchema],
    );

    const handleSubmit = async (values: {
        name: string;
        password: string;
        passwordConfirm: string;
    }) => {
        if (!user) return;
        await updateUserMutation.mutateAsync({
            id: user.id,
            name: values.name,
            password: values.password,
            passwordConfirmation: values.passwordConfirm,
        });
    };

    return {
        user,
        handleSubmit,
        updateUserMutation,
        updateUserFormValidationSchema,
    };
};
