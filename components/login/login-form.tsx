"use client";
import { Label } from "@components/shared/label";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useLogin } from "@hooks/login/use-login";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FieldError } from "../shared/field-error";

export function LoginForm() {
    const t = useTranslations();
    const { handleSubmit, loginMutation, loginFormSchema } = useLogin();

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={loginFormSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, values, errors, touched }) => (
                <Form className="space-y-4">
                    <div className="space-y-2">
                        <Label
                            title={t("fields.email.label")}
                            required
                            requiredText={t("fields.email.required")}
                            htmlFor="email"
                        />
                        <Input
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            placeholder={t("fields.email.placeholder")}
                            type="email"
                        />
                        <FieldError
                            error={errors.email}
                            touched={touched.email}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label
                            title={t("fields.password.label")}
                            required
                            requiredText={t("fields.password.required")}
                            htmlFor="password"
                        />
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder={t("fields.password.placeholder")}
                            onChange={handleChange}
                            value={values.password}
                        />
                        <FieldError
                            error={errors.password}
                            touched={touched.password}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Link
                            href="/auth/forgot"
                            className="text-sm underline-offset-2 hover:underline"
                        >
                            {t("login.forgot")}
                        </Link>
                    </div>
                    <Button
                        className="w-full"
                        type="submit"
                        loading={loginMutation.isPending}
                        disabled={loginMutation.isPending}
                    >
                        {t("login.submit")}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
