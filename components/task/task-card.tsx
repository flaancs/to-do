"use client";
import { Checkbox } from "../ui/checkbox";
import type { Task } from "@lib/types";
import { Input } from "../ui/input";
import { cn } from "@lib/utils";
import { useTaskCard } from "@/hooks/task/use-task-card";
import { TrashIcon } from "lucide-react";

export interface TaskCardProps {
  task: Task;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const { isLoadingUpdate, handleUpdateTask, handleDebouncedChangeTitle } =
    useTaskCard({ task });

  return (
    <div
      className={cn("flex w-full items-center space-x-4 py-2", {
        "animate-pulse": isLoadingUpdate,
      })}
    >
      <Checkbox
        id={task.id}
        defaultChecked={task.completed}
        onCheckedChange={(completed: boolean) =>
          handleUpdateTask({ completed })
        }
        disabled={isLoadingUpdate}
      />
      <Input
        name="title"
        className={cn({
          "line-through": task.completed,
        })}
        defaultValue={task.title}
        disabled={isLoadingUpdate || task.completed}
        placeholder="Enter task title"
        onChange={handleDebouncedChangeTitle}
      />
      <button onClick={() => onDelete(task)}>
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
