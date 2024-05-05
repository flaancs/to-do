import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@lib/api-client";
import { handleRedirect } from "@lib/utils";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const useUserDialog = () => {
    const t = useTranslations();
    const { data: session } = useSession();
    const { toast } = useToast();

    const updateUserMutation = apiClient.auth.update.useMutation({
        onSuccess: () => {
            toast({
                title: t("user.update.notifications.success.title"),
                description: t("user.update.notifications.success.message"),
            });
            handleRedirect("/");
        },
        onError: (error) => {
            toast({
                title: t("common.error"),
                description: error.message,
            });
        },
    });

    const updateUserSchema = useMemo(
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
                        .optional()
                        .or(z.literal("")),
                    passwordConfirm: z
                        .string()
                        .min(8, t("fields.password.minLength"))
                        .max(255, t("fields.password.maxLength"))
                        .optional()
                        .or(z.literal("")),
                })
                .refine((data) => data.password === data.passwordConfirm, {
                    message: t("fields.passwordConfirm.mismatch"),
                    path: ["passwordConfirm"],
                }),
        [t],
    );

    const user = useMemo(() => session?.user || null, [session]);

    useEffect(() => {
        if (user) {
            setValue("name", user.name || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    type FormValues = z.infer<typeof updateUserSchema>;

    const {
        setValue,
        handleSubmit,
        register,
        formState: { isSubmitting, errors, touchedFields },
    } = useForm<FormValues>({
        resolver: zodResolver(updateUserSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async ({
        name,
        password,
        passwordConfirm,
    }) => {
        await updateUserMutation.mutateAsync({
            name: name,
            password: password,
            passwordConfirmation: passwordConfirm,
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
