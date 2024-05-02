"use client";
import { cn } from "@/lib/utils";
import type { Task } from "@packages/db";
import moment from "moment";
import { TaskOptions } from "./task-options";
import { Checkbox } from "./checkbox";

export interface TaskProps {
  task: Task;
}

const today = moment();

export function Task({ task }: TaskProps) {
  const isDueToday = moment(task.dueDate).isSame(today, "day");
  const isOverdue = moment(task.dueDate).isBefore(today, "day");
  const humanizedDueDate = moment(task.dueDate).fromNow();

  return (
    <div className="flex w-full items-center space-x-4 rounded-md bg-gray-100 px-4 py-2 dark:bg-slate-900">
      <Checkbox id={task.id} checked={task.completed} />
      <div className="flex w-full flex-col gap-1">
        {task.dueDate && (
            <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {moment(task.dueDate).format("MMM D, YYYY")}
            </span>
            <span
              className={cn("text-xs px-2 py-0.5 rounded-full border", {
                "text-muted-foreground bg-slate-200 dark:bg-slate-700/50 border-slate-400 dark:border-slate-500": !isDueToday && !isOverdue,
                "text-yellow-600 bg-yellow-100 dark:bg-yellow-700/50 border-yellow-500": isDueToday,
                "text-red-600 bg-red-100 dark:bg-red-900/50 border-red-500": isOverdue,
              })}
            >
              {isOverdue
                ? "Overdue"
                : isDueToday
                  ? "Today"
                  : `${humanizedDueDate}`}
            </span>
          </div>
        )}
        <span
          style={{
            color: task.color,
          }}
        >
          {task.title}
        </span>
      </div>
      <TaskOptions
        onEdit={() => console.log("Edit")}
        onDelete={() => console.log("Delete")}
      />
    </div>
  );
}
