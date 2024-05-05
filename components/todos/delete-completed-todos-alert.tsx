import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { useTranslations } from "next-intl";

export interface DeleteCompletedTodosProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: () => void;
}

export function DeleteCompletedTodos({
    open,
    onOpenChange,
    onDelete,
}: DeleteCompletedTodosProps) {
    const t = useTranslations();
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {t("todos.deleteCompleted.title")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("todos.deleteCompleted.message")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        {t("todos.deleteCompleted.confirm")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
