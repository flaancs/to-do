"use client";
import { Tasks } from "@/components/task/tasks";
import { apiClient } from "@lib/api-client";

export default function List() {
  const {
    data: tasks,
    refetch: refetchTasks,
    isLoading: isLoadingTasks,
  } = apiClient.tasks.get.useQuery();

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <Tasks
        tasks={tasks}
        onRefreshTasks={refetchTasks}
        isLoadingTasks={isLoadingTasks}
      />
    </div>
  );
}
