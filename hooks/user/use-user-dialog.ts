import { useToast } from "@components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { ApiOutput } from "@packages/api";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const UpdateUserSchema = z
    .object({
        name: z.string().min(3).max(255),
        password: z.string().min(8).max(255).optional(),
        passwordConfirm: z.string().min(8).max(255).optional(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    });

const updateUserFormValidationSchema =
    toFormikValidationSchema(UpdateUserSchema);

export interface useUserDialogProps {
    user: ApiOutput["auth"]["user"];
    onUserUpdated: () => void;
}

export const useUserDialog = ({ user, onUserUpdated }: useUserDialogProps) => {
    const { toast } = useToast();

    const updateUserMutation = apiClient.auth.update.useMutation({
        onSuccess: () => {
            toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully.",
            });
            onUserUpdated();
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
            });
        },
    });

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
