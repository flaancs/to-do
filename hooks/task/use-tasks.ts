import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { useState } from "react";
import type { Task } from "@lib/types";

export const useTasks = () => {
  const { toast } = useToast();
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [deleteTaskAlert, setDeleteTaskAlert] = useState(false);
  const [taskIdDelete, setTaskIdDelete] = useState<string | null>(null);
  const utils = apiClient.useUtils();

  const deleteTaskMutation = apiClient.tasks.deleteTask.useMutation({
    onSuccess: () => {
      toast({
        title: "Task deleted",
        description: "Task has been deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "An error occurred",
        description: "An error occurred while deleting the task",
      });
    },
    onMutate: async (deletedTask) => {
      utils.tasks.findAll.setData(undefined, (oldTasks) => {
        const newTasks = [...(oldTasks || [])].filter(
          (task) => task.id !== deletedTask.id,
        );
        return newTasks;
      });
    },
  });

  const handleOpenDeleteAlert = (task: Task) => {
    setTaskIdDelete(task.id);
    setDeleteTaskAlert(true);
  };

  const handleOpenTaskDialog = () => {
    setTaskDialogOpen(true);
  };

  const handleDeleteTask = async () => {
    if (taskIdDelete) {
      await deleteTaskMutation.mutateAsync({ id: taskIdDelete });
      setDeleteTaskAlert(false);
      setTaskIdDelete(null);
    }
  };

  const handleTaskCreatedOrUpdated = () => {
    setTaskDialogOpen(false);
  };

  return {
    taskDialogOpen,
    setTaskDialogOpen,
    deleteTaskAlert,
    setDeleteTaskAlert,
    handleOpenDeleteAlert,
    handleOpenTaskDialog,
    handleDeleteTask,
    handleTaskCreatedOrUpdated,
  };
};
