"use client";
import { Todos } from "@components/todos/todos";
import { apiClient } from "@lib/api-client";

export default function List() {
    const { data: todos, isLoading: isLoadingTodos } =
        apiClient.todos.findAll.useQuery(undefined, {
            refetchOnWindowFocus: false,
        });

    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <Todos todos={todos} isLoadingTodos={isLoadingTodos} />
        </div>
    );
}
