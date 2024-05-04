"use client";

import { useTodos } from "@/hooks/todo/use-todos";
import type { Todos } from "@lib/types";
import { InfoIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { CreateTodo } from "./create-todo";
import { DeleteTodoAlert } from "./delete-todo-alert";
import { TodoCard } from "./todo-card";
import { TodoCardSkeleton } from "./todo-card-skeleton";

export interface TodoProps {
    todos: Todos;
    isLoadingTodos: boolean;
}

export function Todos({ todos, isLoadingTodos }: TodoProps) {
    const {
        deleteTodoAlert,
        setDeleteTodoAlert,
        handleOpenDeleteAlert,
        handleDeleteTodo,
    } = useTodos();

    return (
        <>
            <DeleteTodoAlert
                open={deleteTodoAlert}
                onOpenChange={setDeleteTodoAlert}
                onDelete={handleDeleteTodo}
            />
            <div className="w-full space-y-2">
                <div>
                    <h2 className="mb-2 text-xl font-bold">Create todo</h2>
                    <CreateTodo />
                    <Separator className="my-4" />
                </div>
                <div className="h-96 space-y-2 overflow-y-scroll">
                    {isLoadingTodos ? (
                        <div className="space-y-6">
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
                                    No todos found
                                </h1>
                                <p className="text-sm">
                                    Start by adding a todo
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
