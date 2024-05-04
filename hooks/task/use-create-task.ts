import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { sortTasks } from "@lib/utils";
import { useState } from "react";

export const useCreateTask = () => {
  const { toast } = useToast();
  const [titleInput, setTitleInput] = useState("");
  const utils = apiClient.useUtils();

  const createTaskMutation = apiClient.tasks.create.useMutation({
    onSuccess: (data) => {
      utils.tasks.findAll.setData(undefined, (oldTasks) => {
        const newTasks =
          oldTasks?.map((task) => {
            if (task.id === "created-task") {
              return data;
            }
            return task;
          }) || [];
        return sortTasks(newTasks);
      });
    },
    onError: () => {
      utils.tasks.findAll.refetch();
      toast({
        title: "An error occurred",
        description: "An error occurred while creating the task",
      });
    },
    onMutate: async (newTask) => {
      utils.tasks.findAll.setData(undefined, (oldTasks) => {
        const task = {
          id: "created-task",
          title: newTask.title,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: "",
        };
        const newTasks = [task, ...(oldTasks || [])];
        return newTasks;
      });
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreateTask();
    }
  };

  const handleCreateTask = async () => {
    if (!titleInput) return;
    setTitleInput("");
    await createTaskMutation.mutateAsync({ title: titleInput });
  };

  return {
    titleInput,
    setTitleInput,
    handleCreateTask,
    handleKeyDown,
  };
};
