"use client";

import { useTasks } from "@/hooks/task/use-tasks";
import type { Tasks } from "@lib/types";
import { InfoIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { CreateTask } from "./create-task";
import { DeleteTaskAlert } from "./delete-task-alert";
import { TaskCard } from "./task-card";
import { TaskCardSkeleton } from "./task-card-skeleton";

export interface TaskProps {
  tasks: Tasks;
  isLoadingTasks: boolean;
}

export function Tasks({ tasks, isLoadingTasks }: TaskProps) {
  const {
    deleteTaskAlert,
    setDeleteTaskAlert,
    handleOpenDeleteAlert,
    handleDeleteTask,
  } = useTasks();

  return (
    <>
      <DeleteTaskAlert
        open={deleteTaskAlert}
        onOpenChange={setDeleteTaskAlert}
        onDelete={handleDeleteTask}
      />
      <div className="w-full space-y-2">
        {tasks && (
          <div>
            <h2 className="mb-2 text-xl font-bold">Create todo</h2>
            <CreateTask />
            <Separator className="my-4" />
          </div>
        )}
        <div className="h-96 space-y-2 overflow-y-scroll">
          {isLoadingTasks ? (
            <div className="space-y-6">
              <TaskCardSkeleton />
              <TaskCardSkeleton />
              <TaskCardSkeleton />
              <TaskCardSkeleton />
            </div>
          ) : tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleOpenDeleteAlert}
              />
            ))
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-md border py-4 text-muted-foreground">
              <InfoIcon size={32} />
              <div className="text-center">
                <h1 className="text-lg font-semibold">No tasks found</h1>
                <p className="text-sm">Start by adding a task</p>
              </div>
              <div>
                <CreateTask />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
