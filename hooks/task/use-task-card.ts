import { useToast } from "@/components/ui/use-toast";
import { Task } from "@lib/types";
import { apiClient } from "@lib/api-client";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import moment from "moment";

export interface useTaskCardProps {
  task: Task;
  onUpdated: () => void;
}

export const useTaskCard = ({ task, onUpdated }: useTaskCardProps) => {
  const { toast } = useToast();
  const [calendarPopoverOpen, setCalendarPopoverOpen] = useState(false);

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
      utils.tasks.findAll.refetch();
    },
    onMutate: async (updatedTask) => {
      utils.tasks.findAll.setData(undefined, (oldTasks) => {
        const newTasks = oldTasks?.map((task) => {
          if (task.id === updatedTask.id) {
            return { ...task, ...updatedTask };
          }
          return task;
        }) || []; 
        newTasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
        return newTasks;
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
    isLoadingUpdate,
    calendarPopoverOpen,
    setCalendarPopoverOpen,
    handleUpdateTask,
    handleDebouncedChangeTitle,
  };
};
