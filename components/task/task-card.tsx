"use client";
import moment from "moment";
import { Checkbox } from "../ui/checkbox";
import type { Task } from "@lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Form, Formik } from "formik";
import { FieldError } from "../shared/field-error";
import { cn } from "@lib/utils";
import { useTaskCard } from "@/hooks/task/use-task-card";
import { TrashIcon } from "lucide-react";

export interface TaskCardProps {
  task: Task;
  onUpdated: () => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, onDelete, onUpdated }: TaskCardProps) {
  const {
    isLoadingUpdate,
    handleUpdateTask,
    handleDebouncedChangeTitle,
  } = useTaskCard({ task, onUpdated });

  return (
    <div
      className={cn(
        "flex w-full items-center space-x-4 py-2",
        {
          "animate-pulse": isLoadingUpdate,
        },
      )}
    >
      <Checkbox
        id={task.id}
        defaultChecked={task.completed}
        onCheckedChange={(completed: boolean) =>
          handleUpdateTask({ completed })
        }
        disabled={isLoadingUpdate}
      />
        <div className="grid grid-cols-12 gap-4">
                  <div className="flex w-full flex-col gap-1 col-span-7">
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
                  </div>
                <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        className={cn("h-auto flex-col items-start col-span-5", {
                          "line-through": task.completed,
                        })}
                        variant="outline"
                        disabled={isLoadingUpdate || task.completed}
                        >
                        <span className="font-normal">
                          {task.dueDate
                            ? moment(task.dueDate).format("MMM D, YYYY")
                            : "No due date"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-1">
                      <Calendar
                        selected={task.dueDate || undefined}
                        onDayClick={async (val) => {
                          await handleUpdateTask({ dueDate: val });
                        }}
                        id="due-date"
                      />
                    </PopoverContent>
                  </Popover>
              </div>
          <button onClick={() => onDelete(task)}>
            <TrashIcon className="w-4 h-4" />
          </button>
    </div>
  );
}
