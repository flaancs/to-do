"use client";
import { Label } from "@components/shared/label";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useSignup } from "@hooks/signup/use-signup";
import { Form, Formik } from "formik";
import { FieldError } from "../shared/field-error";

export function SignupForm() {
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
                            onChange={handleChange}
                            value={values.email}
                            placeholder="email@example.com"
                            type="email"
                            name="email"
                        />
                        <FieldError error={errors.email} />
                    </div>
                    <div className="space-y-2">
                        <Label
                            title="Name"
                            required
                            requiredText="Name is required"
                            htmlFor="name"
                        />
                        <Input
                            id="name"
                            placeholder="John Doe"
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                        />
                        <FieldError error={errors.name} />
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
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                        />
                        <FieldError error={errors.password} />
                    </div>
                    <div className="space-y-2">
                        <Label
                            title="Confirm password"
                            required
                            requiredText="Confirmation password is required"
                            htmlFor="confirm-password"
                        />
                        <Input
                            id="confirm-password"
                            type="password"
                            onChange={handleChange}
                            value={values.passwordConfirm}
                            name="passwordConfirm"
                        />
                        <FieldError error={errors.passwordConfirm} />
                    </div>
                    <Button
                        className="w-full"
                        type="submit"
                        loading={signupMutation.isPending}
                        disabled={signupMutation.isPending}
                    >
                        Sign Up
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
