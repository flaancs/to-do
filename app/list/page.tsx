"use client";
import { Tasks } from "@/components/task/tasks";
import { apiClient } from "@lib/api-client";

export default function List() {
  const { data: tasks, isLoading: isLoadingTasks } =
    apiClient.tasks.findAll.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <Tasks tasks={tasks} isLoadingTasks={isLoadingTasks} />
    </div>
  );
}
