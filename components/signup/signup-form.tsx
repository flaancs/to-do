"use client";
import { Label } from "@components/shared/label";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useSignup } from "@hooks/signup/use-signup";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { FieldError } from "../shared/field-error";

export function SignupForm() {
    const t = useTranslations();
    const { handleSubmit, signupMutation, signupFormSchema } = useSignup();

    return (
        <Formik
            initialValues={{
                email: "",
                name: "",
                password: "",
                passwordConfirm: "",
            }}
            validationSchema={signupFormSchema}
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
                            onChange={handleChange}
                            value={values.email}
                            placeholder={t("fields.email.placeholder")}
                            type="email"
                            name="email"
                        />
                        <FieldError
                            error={errors.email}
                            touched={touched.email}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label
                            title={t("fields.name.label")}
                            required
                            requiredText={t("fields.name.required")}
                            htmlFor="name"
                        />
                        <Input
                            id="name"
                            placeholder={t("fields.name.placeholder")}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                        />
                        <FieldError
                            error={errors.name}
                            touched={touched.name}
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
                            onChange={handleChange}
                            value={values.password}
                            placeholder={t("fields.password.placeholder")}
                            name="password"
                        />
                        <FieldError
                            error={errors.password}
                            touched={touched.password}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label
                            title={t("fields.passwordConfirm.label")}
                            required
                            requiredText={t("fields.passwordConfirm.required")}
                            htmlFor="confirm-password"
                        />
                        <Input
                            id="confirm-password"
                            type="password"
                            onChange={handleChange}
                            value={values.passwordConfirm}
                            name="passwordConfirm"
                            placeholder={t(
                                "fields.passwordConfirm.placeholder",
                            )}
                        />
                        <FieldError
                            error={errors.passwordConfirm}
                            touched={touched.passwordConfirm}
                        />
                    </div>
                    <Button
                        className="w-full"
                        type="submit"
                        loading={signupMutation.isPending}
                        disabled={signupMutation.isPending}
                    >
                        {t("signup.submit")}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
