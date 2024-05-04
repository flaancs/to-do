"use client";
import { useTodoCard } from "@/hooks/todo/use-todo-card";
import type { Todo } from "@lib/types";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import { TrashIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

export interface TodoCardProps {
    todo: Todo;
    onDelete: (todo: Todo) => void;
}

export function TodoCard({ todo, onDelete }: TodoCardProps) {
    const { isLoadingUpdate, handleUpdateTodo, handleDebouncedChangeTitle } =
        useTodoCard({ todo });

    return (
        <motion.div
            layout
            className={cn("flex w-full items-center space-x-4 py-2", {
                "animate-pulse": isLoadingUpdate,
            })}
        >
            <Checkbox
                id={todo.id}
                defaultChecked={todo.completed}
                onCheckedChange={(completed: boolean) =>
                    handleUpdateTodo({ completed })
                }
                disabled={isLoadingUpdate}
            />
            <Input
                name="title"
                className={cn({
                    "line-through": todo.completed,
                })}
                defaultValue={todo.title}
                disabled={isLoadingUpdate || todo.completed}
                placeholder="Enter todo title"
                onChange={handleDebouncedChangeTitle}
            />
            <button onClick={() => onDelete(todo)}>
                <TrashIcon className="h-4 w-4" />
            </button>
        </motion.div>
    );
}
