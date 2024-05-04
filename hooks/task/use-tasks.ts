import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import type { Task } from "@lib/types";
import { sortTasks } from "@lib/utils";
import { useState } from "react";

export const useTasks = () => {
  const { toast } = useToast();
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
      utils.tasks.findAll.refetch();
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
        return sortTasks(newTasks);
      });
    },
  });

  const handleOpenDeleteAlert = (task: Task) => {
    setTaskIdDelete(task.id);
    setDeleteTaskAlert(true);
  };

  const handleDeleteTask = async () => {
    if (taskIdDelete) {
      await deleteTaskMutation.mutateAsync({ id: taskIdDelete });
      setDeleteTaskAlert(false);
      setTaskIdDelete(null);
    }
  };

  return {
    deleteTaskAlert,
    setDeleteTaskAlert,
    handleOpenDeleteAlert,
    handleDeleteTask,
  };
};
