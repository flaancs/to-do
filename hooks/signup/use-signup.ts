import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/user-context";
import { apiClient } from "@lib/api-client";
import { useRouter } from "next/navigation";
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
        password: z.string({
            required_error: "Password is required",
        }).min(8).max(255),
        passwordConfirm: z.string({
            required_error: "Password confirmation is required",
        }).min(8).max(255),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    });

const signupFormSchema = toFormikValidationSchema(SignupSchema);

export const useSignup = () => {
    const { toast } = useToast();
    const { reloadUser } = useUser();
    const router = useRouter();

    const signupMutation = apiClient.auth.signup.useMutation({
        onSuccess: () => {
            reloadUser();
            router.replace("/todos");
        },
        onError: (error) => {
            toast({
                title: "An error occurred when signing up",
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
