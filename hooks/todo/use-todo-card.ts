import { useToast } from "@components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { Todo } from "@lib/types";
import { sortTodos } from "@lib/utils";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useMemo } from "react";

export interface useTodoCardProps {
    todo: Todo;
}

export const useTodoCard = ({ todo }: useTodoCardProps) => {
    const t = useTranslations();
    const { toast } = useToast();

    const utils = apiClient.useUtils();

    const updateTodoMutation = apiClient.todos.update.useMutation({
        onError: () => {
            utils.todos.findAll.refetch();
            toast({
                title: t("common.error"),
                description: t("todos.update.notifications.error"),
            });
        },
        onMutate: async (updatedTodo) => {
            utils.todos.findAll.setData(undefined, (oldTodos) => {
                const newTodos =
                    oldTodos?.map((todo) => {
                        if (todo.id === updatedTodo.id) {
                            return { ...todo, ...updatedTodo };
                        }
                        return todo;
                    }) || [];
                return sortTodos(newTodos);
            });
        },
    });

    const isLoadingUpdate = useMemo(
        () => updateTodoMutation.isPending,
        [updateTodoMutation.isPending],
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebouncedChangeTitle = useCallback(
        debounce((event: ChangeEvent<HTMLInputElement>) => {
            handleUpdateTodo({ title: event.target.value });
        }, 1000),
        [],
    );

    const handleUpdateTodo = async ({
        title,
        completed,
    }: {
        title?: string;
        completed?: boolean;
    }) => {
        await updateTodoMutation.mutateAsync({
            id: todo.id,
            title: title || todo.title,
            completed: completed !== undefined ? completed : todo.completed,
        });
    };

    return {
        isLoadingUpdate,
        handleUpdateTodo,
        handleDebouncedChangeTitle,
    };
};
