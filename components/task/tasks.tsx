"use client";

import { InfoIcon } from "lucide-react";
import { TaskCard } from "./task-card";
import { TaskDialog } from "./task-dialog";
import { DeleteTaskAlert } from "./delete-task-alert";
import { Button } from "../ui/button";
import { useTasks } from "@/hooks/task/use-tasks";
import { TaskCardSkeleton } from "./task-card-skeleton";
import type { Tasks } from "@lib/types";
import { motion } from "framer-motion";

export interface TaskProps {
  tasks: Tasks;
  isLoadingTasks: boolean;
}

export function Tasks({ tasks, isLoadingTasks }: TaskProps) {
  const {
    taskDialogOpen,
    setTaskDialogOpen,
    deleteTaskAlert,
    setDeleteTaskAlert,
    handleOpenDeleteAlert,
    handleOpenTaskDialog,
    handleDeleteTask,
    handleTaskCreatedOrUpdated,
  } = useTasks();

  return (
    <>
      <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        onCreated={handleTaskCreatedOrUpdated}
        onUpdated={handleTaskCreatedOrUpdated}
      />
      <DeleteTaskAlert
        open={deleteTaskAlert}
        onOpenChange={setDeleteTaskAlert}
        onDelete={handleDeleteTask}
      />
      <div className="w-full space-y-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Todo List</h2>
          <Button onClick={() => handleOpenTaskDialog()} variant="outline">
            <span>Add Task</span>
          </Button>
        </div>
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
              <motion.div layout key={task.id}>
              <TaskCard
                task={task}
                onDelete={handleOpenDeleteAlert}
                onUpdated={handleTaskCreatedOrUpdated}
              />
              </motion.div>
            ))
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-md border py-4 text-muted-foreground">
            <InfoIcon size={32} />
            <div className="text-center">
              <h1 className="text-lg font-semibold">No tasks found</h1>
              <p className="text-sm">Start by adding a task</p>
            </div>
            <Button onClick={() => handleOpenTaskDialog()}>
              <span>Add Task</span>
            </Button>
          </div>
        )}
          </div>
      </div>
    </>
  );
}
