import { useToast } from "@components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { handleRedirect } from "@lib/utils";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const SignupSchema = z
    .object({
        email: z
            .string({
                required_error: "Email is required",
            })
            .email("Invalid email")
            .max(255),
        name: z
            .string({
                required_error: "Name is required",
            })
            .min(3)
            .max(255),
        password: z
            .string({
                required_error: "Password is required",
            })
            .min(8)
            .max(255),
        passwordConfirm: z
            .string({
                required_error: "Password confirmation is required",
            })
            .min(8)
            .max(255),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    });

const signupFormSchema = toFormikValidationSchema(SignupSchema);

export const useSignup = () => {
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
