import { apiClient } from "@lib/api-client";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const ForgotPasswordSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Invalid email")
        .max(255),
});

const forgotPasswordFormValidationSchema =
    toFormikValidationSchema(ForgotPasswordSchema);

export const useForgot = () => {
    const forgotPasswordMutation = apiClient.auth.forgot.useMutation({
        onSettled: () => setSent(true),
    });
    const [sent, setSent] = useState(false);

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
