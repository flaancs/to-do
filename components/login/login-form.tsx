"use client";
import { Label } from "@/components/shared/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/login/use-login";
import { Form, Formik } from "formik";
import { FieldError } from "../shared/field-error";
import Link from "next/link";

export function LoginForm() {
    const {
        handleSubmit,
        loginMutation,
        loginFormSchema,
    } = useLogin();

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={loginFormSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, values, errors }) => (
                <Form className="space-y-4">
                    <div className="space-y-2">
                        <Label
                            title="Email"
                            required
                            requiredText="Email is required"
                            htmlFor="email"
                        />
                        <Input
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            placeholder="email@example.com"
                            type="email"
                        />
                        <FieldError error={errors.email} />
                    </div>
                    <div className="space-y-2">
                        <Label
                            title="Password"
                            required
                            requiredText="Password is required"
                            htmlFor="password"
                        />
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                        />
                        <FieldError error={errors.password} />
                    </div>
                    <div className="flex justify-end">
                        <Link
                            href="/auth/forgot"
                            className="text-sm underline-offset-2 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Button
                        className="w-full"
                        type="submit"
                        loading={loginMutation.isPending}
                        disabled={loginMutation.isPending}
                    >
                        Sign In
                    </Button>
                </Form>
            )}
        </Formik>
    );
}