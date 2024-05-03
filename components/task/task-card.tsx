"use client";
import moment from "moment";
import { TaskOptions } from "./task-options";
import { Checkbox } from "../ui/checkbox";
import type { Task } from "@lib/types";
import { Button } from "../ui/button";
import { CheckIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Form, Formik } from "formik";
import { FieldError } from "../shared/field-error";
import { cn } from "@lib/utils";
import { useTaskCard } from "@/hooks/task/use-task-card";

export interface TaskCardProps {
  task: Task;
  onUpdated: () => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, onDelete, onUpdated }: TaskCardProps) {
  const {
    isEditing,
    setIsEditing,
    isLoadingUpdate,
    humanizedDueDate,
    handleUpdateTask,
  } = useTaskCard({ task, onUpdated });

  return (
    <div
      className={cn(
        "flex w-full items-center space-x-4 rounded-md bg-gray-100 px-4 py-2 dark:bg-slate-900",
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
      <div className="flex w-full flex-col gap-1">
        {isEditing ? (
          <Formik
            enableReinitialize
            initialValues={{ title: task.title, dueDate: task.dueDate }}
            onSubmit={async ({ title, dueDate }) => {
              setIsEditing(false);
              await handleUpdateTask({ title, dueDate });
            }}
          >
            {({
              values,
              setFieldValue,
              handleChange,
              errors,
              isSubmitting,
            }) => (
              <Form className="flex items-center justify-between gap-4">
                <div className="flex w-full flex-col gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        className="h-auto w-full flex-col items-start"
                        variant="outline"
                        disabled={isLoadingUpdate}
                      >
                        <span className="font-normal">
                          {values.dueDate
                            ? moment(values.dueDate).format("MMM D, YYYY")
                            : "No due date"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-1">
                      <Calendar
                        selected={values.dueDate || undefined}
                        onDayClick={(val) => {
                          setFieldValue("dueDate", val);
                        }}
                        id="due-date"
                      />
                    </PopoverContent>
                  </Popover>
                  <div className="flex w-full flex-col gap-1">
                    <Input
                      name="title"
                      value={values.title}
                      disabled={isSubmitting}
                      placeholder="Enter task title"
                      onChange={handleChange}
                      autoFocus
                    />
                    <FieldError error={errors.title} />
                  </div>
                </div>
                <Tooltip>
                  <TooltipContent>Save task</TooltipContent>
                  <TooltipTrigger asChild>
                    <button type="submit">
                      <CheckIcon className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                </Tooltip>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {task.dueDate
                  ? moment(task.dueDate).format("MMM D, YYYY")
                  : "No due date"}
              </span>
              <span className="text-xs">
                {task.dueDate && humanizedDueDate}
              </span>
            </div>
            <span>{task.title}</span>
          </>
        )}
      </div>
      <TaskOptions
        disabled={isLoadingUpdate}
        showOptions={!isEditing}
        onDelete={() => onDelete(task)}
        onEdit={() => setIsEditing(true)}
      />
    </div>
  );
}
