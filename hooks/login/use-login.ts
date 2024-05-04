import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/user-context";
import { apiClient } from "@lib/api-client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const LoginSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Invalid email")
        .max(255),
    password: z.string({
        required_error: "Password is required",
    }),
});

const loginFormSchema = toFormikValidationSchema(LoginSchema);

export const useLogin = () => {
    const { toast } = useToast();
    const { reloadUser } = useUser();
    const router = useRouter();

    const loginMutation = apiClient.auth.login.useMutation({
        onSuccess: () => {
            reloadUser();
            router.replace("/todos");
        },
        onError: () => {
            toast({
                title: "Invalid email or password",
            });
        },
    });

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
