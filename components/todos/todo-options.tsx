import { Button } from "@components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Pencil, TrashIcon } from "lucide-react";

export interface TodoOptionsProps {
    disabled?: boolean;
    showOptions?: boolean;
    onDelete: () => void;
    onEdit: () => void;
}

export function TodoOptions({
    disabled,
    showOptions,
    onDelete,
    onEdit,
}: TodoOptionsProps) {
    if (!showOptions) return null;
    return (
        <div className="flex items-center space-x-2">
            <Tooltip>
                <TooltipContent>Edit todo</TooltipContent>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        disabled={disabled}
                        variant="ghost"
                        onClick={onEdit}
                    >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit todo</span>
                    </Button>
                </TooltipTrigger>
            </Tooltip>
            <Tooltip>
                <TooltipContent>Delete todo</TooltipContent>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        disabled={disabled}
                        variant="ghost"
                        onClick={onDelete}
                    >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete todo</span>
                    </Button>
                </TooltipTrigger>
            </Tooltip>
        </div>
    );
}
