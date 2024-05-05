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
import { useTranslations } from "next-intl";
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
    const t = useTranslations();
    const { handleSubmit, updateUserMutation, updateUserFormValidationSchema } =
        useUserDialog({ user, onUserUpdated });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("user.update.title")}</DialogTitle>
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
                    {({ handleChange, values, errors, touched }) => (
                        <Form className="space-y-4">
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
                                    htmlFor="password"
                                />
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    placeholder={t(
                                        "fields.password.placeholder",
                                    )}
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
                                loading={updateUserMutation.isPending}
                                disabled={updateUserMutation.isPending}
                            >
                                {t("user.update.submit")}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
