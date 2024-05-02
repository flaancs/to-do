import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TaskOptionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskOptions({ onEdit, onDelete }: TaskOptionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Tooltip>
        <TooltipContent>Edit task</TooltipContent>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <PencilIcon className="h-4 w-4" />
            <span className="sr-only">Edit task</span>
          </Button>
        </TooltipTrigger>
      </Tooltip>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Tooltip>
            <TooltipContent>Delete task</TooltipContent>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
