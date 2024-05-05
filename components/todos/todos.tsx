"use client";

import { Button } from "@components/ui/button";
import { useTodos } from "@hooks/todo/use-todos";
import type { Todos } from "@lib/types";
import { InfoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import { CreateTodo } from "./create-todo";
import { DeleteCompletedTodos } from "./delete-completed-todos-alert";
import { DeleteTodoAlert } from "./delete-todo-alert";
import { TodoCard } from "./todo-card";
import { TodoCardSkeleton } from "./todo-card-skeleton";

export interface TodoProps {
    todos: Todos;
    isLoadingTodos: boolean;
}

export function Todos({ todos, isLoadingTodos }: TodoProps) {
    const t = useTranslations();
    const {
        deleteTodoAlert,
        setDeleteTodoAlert,
        handleOpenDeleteAlert,
        handleDeleteTodo,
        deleteCompletedTodosAlert,
        setDeleteCompletedTodosAlert,
        handleDeleteCompletedTodos,
        deleteAllCompletedTodosMutation,
    } = useTodos();

    return (
        <>
            <DeleteCompletedTodos
                open={deleteCompletedTodosAlert}
                onOpenChange={setDeleteCompletedTodosAlert}
                onDelete={handleDeleteCompletedTodos}
            />
            <DeleteTodoAlert
                open={deleteTodoAlert}
                onOpenChange={setDeleteTodoAlert}
                onDelete={handleDeleteTodo}
            />
            <div className="w-full space-y-2">
                <div>
                    <h2 className="mb-2 text-xl font-bold">
                        {t("todos.create.title")}
                    </h2>
                    <CreateTodo />
                    <Separator className="my-4" />
                </div>
                <div className="max-h-96 space-y-2 overflow-y-scroll">
                    {isLoadingTodos ? (
                        <div className="space-y-2">
                            <TodoCardSkeleton />
                            <TodoCardSkeleton />
                            <TodoCardSkeleton />
                            <TodoCardSkeleton />
                        </div>
                    ) : todos && todos.length > 0 ? (
                        todos.map((todo) => (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                onDelete={handleOpenDeleteAlert}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center gap-4 rounded-md border py-4 text-muted-foreground">
                            <InfoIcon size={32} />
                            <div className="text-center">
                                <h1 className="text-lg font-semibold">
                                    {t("todos.empty.title")}
                                </h1>
                                <p className="text-sm">
                                    {t("todos.empty.message")}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                {todos &&
                    todos.length > 0 &&
                    todos.filter((todo) => todo.completed).length > 0 && (
                        <div className="flex justify-center">
                            <Button
                                disabled={
                                    deleteAllCompletedTodosMutation.isPending
                                }
                                loading={
                                    deleteAllCompletedTodosMutation.isPending
                                }
                                onClick={() =>
                                    setDeleteCompletedTodosAlert(true)
                                }
                            >
                                {t("todos.deleteCompleted.title")}
                            </Button>
                        </div>
                    )}
            </div>
        </>
    );
}
