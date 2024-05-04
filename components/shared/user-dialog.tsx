"use client";
import { Label } from "@components/shared/label";
import { Button } from "@components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { useUserDialog } from "@hooks/user/use-user-dialog";
import { ApiOutput } from "@packages/api";
import { Form, Formik } from "formik";
import { FieldError } from "../shared/field-error";

export interface UserDialogProps {
    open: boolean;
    user: ApiOutput["auth"]["user"];
    onUserUpdated: () => void;
    onOpenChange: (open: boolean) => void;
}

export function UserDialog({
    open,
    user,
    onUserUpdated,
    onOpenChange,
}: UserDialogProps) {
    const { handleSubmit, updateUserMutation, updateUserFormValidationSchema } =
        useUserDialog({ user, onUserUpdated });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update profile</DialogTitle>
                </DialogHeader>
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: user?.name || "",
                        password: "",
                        passwordConfirm: "",
                    }}
                    validationSchema={updateUserFormValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values, errors }) => (
                        <Form className="space-y-4">
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
                                <Label title="Password" htmlFor="password" />
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
                                loading={updateUserMutation.isPending}
                                disabled={updateUserMutation.isPending}
                            >
                                Update
                            </Button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
