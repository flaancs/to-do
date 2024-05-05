"use client";
import { FieldError } from "@components/shared/field-error";
import { Label } from "@components/shared/label";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useRecovery } from "@hooks/recovery/use-recovery";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";

export default function Recovery() {
    const t = useTranslations();
    const {
        handleSubmit,
        setPasswordMutation,
        recoveryPasswordFormValidationSchema,
    } = useRecovery();

    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">{t("recovery.title")}</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    {t("recovery.description")}
                </p>
            </div>
            <Formik
                initialValues={{
                    password: "",
                    passwordConfirm: "",
                }}
                validationSchema={recoveryPasswordFormValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, values, errors, touched }) => (
                    <Form className="space-y-4">
                        <div className="space-y-2">
                            <Label
                                title={t("fields.password.label")}
                                required
                                requiredText={t("fields.password.required")}
                                htmlFor="password"
                            />
                            <Input
                                id="password"
                                placeholder={t("fields.password.placeholder")}
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                type="password"
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
                                requiredText={t(
                                    "fields.passwordConfirm.required",
                                )}
                                htmlFor="password"
                            />
                            <Input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                placeholder={t(
                                    "fields.passwordConfirm.placeholder",
                                )}
                                onChange={handleChange}
                                value={values.passwordConfirm}
                                type="password"
                            />
                            <FieldError
                                error={errors.passwordConfirm}
                                touched={touched.passwordConfirm}
                            />
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            loading={setPasswordMutation.isPending}
                            disabled={setPasswordMutation.isPending}
                        >
                            {t("recovery.submit")}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
