import { useToast } from "@/components/ui/use-toast";
import { Task } from "@lib/types";
import { apiClient } from "@lib/api-client";
import { useMemo, useState } from "react";
import moment from "moment";

export interface useTaskCardProps {
  task: Task;
  onUpdated: () => void;
}

export const useTaskCard = ({ task, onUpdated }: useTaskCardProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const utils = apiClient.useUtils();

  const updateTaskMutation = apiClient.tasks.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Task updated",
        description: "Task has been updated successfully",
      });
      onUpdated();
    },
    onError: () => {
      toast({
        title: "An error occurred",
        description: "An error occurred while updating the task",
      });
    },
    onMutate: async (updatedTask) => {
      utils.tasks.findAll.setData(undefined, (oldTasks) => {
        return oldTasks?.map((task) => {
          if (task.id === updatedTask.id) {
            return { ...task, ...updatedTask };
          }
          return task;
        });
      });
    },
  });

  const isLoadingUpdate = useMemo(
    () => updateTaskMutation.isPending,
    [updateTaskMutation.isPending],
  );

  const humanizedDueDate = useMemo(
    () => moment(task.dueDate).fromNow(),
    [task.dueDate],
  );

  const handleUpdateTask = async ({
    title,
    completed,
    dueDate,
  }: {
    title?: string;
    completed?: boolean;
    dueDate?: Date | null;
  }) => {
    await updateTaskMutation.mutateAsync({
      id: task.id,
      title: title || task.title,
      completed: completed !== undefined ? completed : task.completed,
      dueDate: dueDate !== undefined ? dueDate : task.dueDate,
    });
  };

  return {
    isEditing,
    setIsEditing,
    isLoadingUpdate,
    humanizedDueDate,
    handleUpdateTask,
  };
};
