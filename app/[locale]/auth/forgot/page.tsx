"use client";
import { Label } from "@components/shared/label";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useForgot } from "@hooks/forgot/use-forgot";
import { Form, Formik } from "formik";
import { SendIcon, UndoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Forgot() {
    const t = useTranslations();
    const {
        sent,
        handleSubmit,
        handleKeyDown,
        forgotPasswordMutation,
        forgotPasswordFormValidationSchema,
    } = useForgot();

    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                {sent ? (
                    <SendIcon className="w-16 h-16 mx-auto" />
                ) : (
                    <>
                        <h1 className="text-3xl font-bold">
                            {t("forgot.title")}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {t("forgot.description")}
                        </p>
                    </>
                )}
            </div>
            {sent ? (
                <p className="text-center">{t("forgot.sent")}</p>
            ) : (
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validationSchema={forgotPasswordFormValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values }) => (
                        <Form className="space-y-4">
                            <div className="space-y-2">
                                <Label
                                    required
                                    requiredText={t("fields.email.required")}
                                    htmlFor="email"
                                    title={t("fields.email.label")}
                                />
                                <Input
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    onKeyDown={handleKeyDown}
                                    placeholder={t("fields.email.placeholder")}
                                    type="email"
                                />
                            </div>
                            <Button
                                className="w-full"
                                type="submit"
                                loading={forgotPasswordMutation.isPending}
                                disabled={forgotPasswordMutation.isPending}
                            >
                                {t("forgot.submit")}
                            </Button>
                            <div className="flex justify-center my-1">
                                <Link href="/auth/login">
                                    {t("signup.goLogin")}
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
            {sent && (
                <div className="flex justify-center">
                    <Button asChild className="mt-4">
                        <Link href="/auth/login">
                            <UndoIcon className="mr-2 h-4 w-4" />{" "}
                            {t("signup.goLogin")}
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
