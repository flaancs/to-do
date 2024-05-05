import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const useLogin = () => {
    const t = useTranslations();
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const email = useMemo(() => searchParams.get("email"), [searchParams]);
    const error = useMemo(() => searchParams.get("error"), [searchParams]);

    useMemo(() => {
        switch (error) {
            case "OAuthAccountNotLinked":
                toast({
                    title: t("login.notifications.notCreated.title"),
                    description: t("login.notifications.notCreated.message"),
                });
                break;
            case "CredentialsSignin":
                toast({
                    title: t("login.notifications.error.title"),
                    description: t("login.notifications.error.message"),
                });
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, t]);

    const loginFormSchema = useMemo(
        () =>
            z.object({
                email: z
                    .string({
                        required_error: t("fields.email.required"),
                    })
                    .email(t("fields.email.invalid"))
                    .max(255, t("fields.email.maxLength")),
                password: z
                    .string({
                        required_error: t("fields.password.required"),
                    })
                    .max(255, t("fields.password.maxLength")),
            }),
        [t],
    );

    type FormValues = z.infer<typeof loginFormSchema>;

    const {
        handleSubmit,
        register,
        formState: { errors, touchedFields },
    } = useForm<FormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: email || "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
        setIsLoadingLogin(true);
        try {
            signIn("credentials", {
                email,
                password,
                callbackUrl: "/todos",
            });
        } catch {
            toast({
                title: t("login.notifications.error.title"),
                description: t("login.notifications.error.message"),
            });
        }
    };

    return {
        handleSubmit,
        onSubmit,
        register,
        errors,
        touchedFields,
        isLoadingLogin,
    };
};
