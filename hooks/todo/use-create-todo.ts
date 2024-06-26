import { useToast } from "@components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { sortTodos } from "@lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const useCreateTodo = () => {
    const t = useTranslations();
    const { toast } = useToast();
    const [titleInput, setTitleInput] = useState("");
    const utils = apiClient.useUtils();

    const createTodoMutation = apiClient.todos.create.useMutation({
        onSuccess: (data) => {
            utils.todos.findAll.setData(undefined, (oldTodos) => {
                const newTodos =
                    oldTodos?.map((todo) => {
                        if (todo.id === "created-todo") {
                            return data;
                        }
                        return todo;
                    }) || [];
                return sortTodos(newTodos);
            });
        },
        onError: () => {
            utils.todos.findAll.refetch();
            toast({
                title: t("common.error"),
                description: t("todos.create.notifications.error"),
            });
        },
        onMutate: async (newTodo) => {
            utils.todos.findAll.setData(undefined, (oldTodos) => {
                const todo = {
                    id: "created-todo",
                    title: newTodo.title,
                    completed: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: "",
                };
                const newTodos = [todo, ...(oldTodos || [])];
                return newTodos;
            });
        },
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleCreateTodo();
        }
    };

    const handleCreateTodo = async () => {
        if (!titleInput) return;
        setTitleInput("");
        await createTodoMutation.mutateAsync({ title: titleInput });
    };

    return {
        titleInput,
        setTitleInput,
        handleKeyDown,
        handleCreateTodo,
        createTodoMutation,
    };
};
