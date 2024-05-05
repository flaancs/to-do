import { Button } from "@components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Pencil, TrashIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export interface TodoOptionsProps {
    disabled?: boolean;
    showOptions?: boolean;
    onDelete: () => void;
    onEdit: () => void;
}

export async function TodoOptions({
    disabled,
    showOptions,
    onDelete,
    onEdit,
}: TodoOptionsProps) {
    const t = await getTranslations();

    if (!showOptions) return null;
    return (
        <div className="flex items-center space-x-2">
            <Tooltip>
                <TooltipContent>{t("todos.update.tooltip")}</TooltipContent>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        disabled={disabled}
                        variant="ghost"
                        onClick={onEdit}
                    >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">
                            {t("todos.update.tooltip")}
                        </span>
                    </Button>
                </TooltipTrigger>
            </Tooltip>
            <Tooltip>
                <TooltipContent>{t("todos.delete.tooltip")}</TooltipContent>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        disabled={disabled}
                        variant="ghost"
                        onClick={onDelete}
                    >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">
                            {t("todos.delete.tooltip")}
                        </span>
                    </Button>
                </TooltipTrigger>
            </Tooltip>
        </div>
    );
}
