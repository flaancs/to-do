import { useCreateTask } from "@/hooks/task/use-create-task";
import { Input } from "../ui/input";
import { CheckIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function CreateTask() {
  const { titleInput, setTitleInput, handleCreateTask, handleKeyDown } =
    useCreateTask();

  return (
    <div className="flex w-full items-center gap-4">
      <Input
        value={titleInput}
        onChange={(e) => setTitleInput(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder="Walk the dog..."
      />
      <Tooltip>
        <TooltipContent>Create task</TooltipContent>
        <TooltipTrigger>
          <button onClick={handleCreateTask} disabled={!titleInput}>
            <CheckIcon className="h-4 w-4" />
          </button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  );
}
