import { useToast } from "@components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import type { Todo } from "@lib/types";
import { sortTodos } from "@lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const useTodos = () => {
    const t = useTranslations();
    const { toast } = useToast();
    const [deleteTodoAlert, setDeleteTodoAlert] = useState(false);
    const [todoIdDelete, setTodoIdDelete] = useState<string | null>(null);
    const utils = apiClient.useUtils();

    const deleteTodoMutation = apiClient.todos.deleteTodo.useMutation({
        onError: () => {
            utils.todos.findAll.refetch();
            toast({
                title: t("common.error"),
                description: t("todos.delete.notifications.error"),
            });
        },
        onMutate: async (deletedTodo) => {
            utils.todos.findAll.setData(undefined, (oldTodos) => {
                const newTodos = [...(oldTodos || [])].filter(
                    (todo) => todo.id !== deletedTodo.id,
                );
                return sortTodos(newTodos);
            });
        },
    });

    const handleOpenDeleteAlert = (todo: Todo) => {
        setTodoIdDelete(todo.id);
        setDeleteTodoAlert(true);
    };

    const handleDeleteTodo = async () => {
        if (todoIdDelete) {
            await deleteTodoMutation.mutateAsync({ id: todoIdDelete });
            setDeleteTodoAlert(false);
            setTodoIdDelete(null);
        }
    };

    return {
        deleteTodoAlert,
        setDeleteTodoAlert,
        handleOpenDeleteAlert,
        handleDeleteTodo,
    };
};
