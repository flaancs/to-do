import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TaskOptionsProps {
  disabled?: boolean;
  showOptions?: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

export function TaskOptions({
  disabled,
  showOptions,
  onDelete,
  onEdit,
}: TaskOptionsProps) {
  if (!showOptions) return null;
  return (
    <div className="flex items-center space-x-2">
      <Tooltip>
        <TooltipContent>Edit task</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            disabled={disabled}
            variant="ghost"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit task</span>
          </Button>
        </TooltipTrigger>
      </Tooltip>
      <Tooltip>
        <TooltipContent>Delete task</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            disabled={disabled}
            variant="ghost"
            onClick={onDelete}
          >
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  );
}
