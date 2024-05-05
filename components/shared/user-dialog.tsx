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
import { useTranslations } from "next-intl";
import { FieldError } from "../shared/field-error";

export interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDialog({ open, onOpenChange }: UserDialogProps) {
    const t = useTranslations();
    const {
        handleSubmit,
        register,
        onSubmit,
        isSubmitting,
        errors,
        touchedFields,
    } = useUserDialog();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("user.update.title")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            {...register("name")}
                        />
                        <FieldError
                            error={errors.name?.message}
                            touched={touchedFields.name}
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
                            placeholder={t("fields.password.placeholder")}
                            {...register("password")}
                        />
                        <FieldError
                            error={errors.password?.message}
                            touched={touchedFields.password}
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
                            placeholder={t(
                                "fields.passwordConfirm.placeholder",
                            )}
                            {...register("passwordConfirm")}
                        />
                        <FieldError
                            error={errors.passwordConfirm?.message}
                            touched={touchedFields.passwordConfirm}
                        />
                    </div>
                    <Button
                        className="w-full"
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {t("user.update.submit")}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
