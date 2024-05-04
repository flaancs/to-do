import { useCreateTodo } from "@/hooks/todo/use-create-todo";
import { CheckIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function CreateTodo() {
  const { titleInput, setTitleInput, handleCreateTodo, handleKeyDown } =
    useCreateTodo();

  return (
    <div className="flex w-full items-center gap-4">
      <Input
        value={titleInput}
        onChange={(e) => setTitleInput(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder="Buy groceries..."
      />
      <Tooltip>
        <TooltipContent>Create todo</TooltipContent>
        <TooltipTrigger>
          <button onClick={handleCreateTodo} disabled={!titleInput}>
            <CheckIcon className="h-4 w-4" />
          </button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  );
}
