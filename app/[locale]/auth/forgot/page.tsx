"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useForgot } from "@hooks/forgot/use-forgot";
import { Form, Formik } from "formik";
import { SendIcon, UndoIcon } from "lucide-react";
import Link from "next/link";

export default function Forgot() {
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
                        <h1 className="text-3xl font-bold">Forgot Password</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Enter your email to reset your password.
                        </p>
                    </>
                )}
            </div>
            {sent ? (
                <p>
                    If an account with that email exists, we sent you an email
                    with instructions to reset your password.
                </p>
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
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    onKeyDown={handleKeyDown}
                                    placeholder="email@example.com"
                                    type="email"
                                />
                            </div>
                            <Button
                                className="w-full"
                                type="submit"
                                loading={forgotPasswordMutation.isPending}
                                disabled={forgotPasswordMutation.isPending}
                            >
                                Reset Password
                            </Button>
                        </Form>
                    )}
                </Formik>
            )}
            {sent && (
                <div className="flex justify-center">
                    <Button asChild className="mt-4">
                        <Link href="/auth/login">
                            <UndoIcon className="mr-2 h-4 w-4" /> Go to login
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
