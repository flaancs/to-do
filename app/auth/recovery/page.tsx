"use client";
import { FieldError } from "@/components/shared/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRecovery } from "@/hooks/recovery/use-recovery";
import { Form, Formik } from "formik";

export default function Recovery() {
    const {
        handleSubmit,
        setPasswordMutation,
        recoveryPasswordFormValidationSchema,
    } = useRecovery();

    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Create new password</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your new password below.
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
                {({ handleChange, values, errors }) => (
                    <Form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                type="password"
                            />
                            <FieldError error={errors.password} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="passwordConfirm">
                                Confirm password
                            </Label>
                            <Input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                onChange={handleChange}
                                value={values.passwordConfirm}
                                type="password"
                            />
                            <FieldError error={errors.passwordConfirm} />
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            loading={setPasswordMutation.isPending}
                            disabled={setPasswordMutation.isPending}
                        >
                            Set password
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
