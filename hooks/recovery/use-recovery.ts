import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

const RecoveryPasswordSchema = z
    .object({
        password: z
            .string({
                required_error: "Password is required",
            })
            .min(8, "Password must be at least 8 characters")
            .max(255, "Password must be at most 255 characters"),
        passwordConfirm: z
            .string({
                required_error: "Password confirmation is required",
            })
            .min(8, "Password must be at least 8 characters")
            .max(255, "Password must be at most 255 characters"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    });

const recoveryPasswordFormValidationSchema = toFormikValidationSchema(
    RecoveryPasswordSchema,
);

export const useRecovery = () => {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();

    const setPasswordMutation = apiClient.auth.setPassword.useMutation({
        onSuccess: () => {
            toast({
                title: "Your password has been updated successfully",
            });
            router.replace("/todos");
            router.refresh();
        },
        onError: (error) => {
                toast({
                    title: "An error occurred while updating your password",
                    description: error.message,
                });
        },
    });

    const handleSubmit = async (values: {
        password: string;
        passwordConfirm: string;
    }) => {
        const token = searchParams.get('token') as string;
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