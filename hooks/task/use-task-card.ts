import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { Task } from "@lib/types";
import { sortTasks } from "@lib/utils";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useMemo } from "react";

export interface useTaskCardProps {
  task: Task;
}

export const useTaskCard = ({ task }: useTaskCardProps) => {
  const { toast } = useToast();

  const utils = apiClient.useUtils();

  const updateTaskMutation = apiClient.tasks.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Task updated",
        description: "Task has been updated successfully",
      });
    },
    onError: () => {
      utils.tasks.findAll.refetch();
      toast({
        title: "An error occurred",
        description: "An error occurred while updating the task",
      });
    },
    onMutate: async (updatedTask) => {
      utils.tasks.findAll.setData(undefined, (oldTasks) => {
        const newTasks =
          oldTasks?.map((task) => {
            if (task.id === updatedTask.id) {
              return { ...task, ...updatedTask };
            }
            return task;
          }) || [];
        return sortTasks(newTasks);
      });
    },
  });

  const isLoadingUpdate = useMemo(
    () => updateTaskMutation.isPending,
    [updateTaskMutation.isPending],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebouncedChangeTitle = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      handleUpdateTask({ title: event.target.value });
    }, 1000),
    [],
  );

  const handleUpdateTask = async ({
    title,
    completed,
  }: {
    title?: string;
    completed?: boolean;
  }) => {
    await updateTaskMutation.mutateAsync({
      id: task.id,
      title: title || task.title,
      completed: completed !== undefined ? completed : task.completed,
    });
  };

  return {
    isLoadingUpdate,
    handleUpdateTask,
    handleDebouncedChangeTitle,
  };
};
