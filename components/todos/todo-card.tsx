import { useTodoCard } from "@hooks/todo/use-todo-card";
import type { Todo } from "@lib/types";
import { cn } from "@lib/utils";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent } from "../ui/tooltip";

export interface TodoCardProps {
    todo: Todo;
    onDelete: (todo: Todo) => void;
}

export function TodoCard({ todo, onDelete }: TodoCardProps) {
    const t = useTranslations();
    const { isLoadingUpdate, handleUpdateTodo, handleDebouncedChangeTitle } =
        useTodoCard({ todo });

    return (
        <motion.div
            layout
            data-testid="todo-card"
            className={cn(
                "flex w-full items-center gap-2 px-2 border rounded-md",
                {
                    "animate-pulse": isLoadingUpdate,
                },
            )}
        >
            <Checkbox
                data-testid="todo-checkbox"
                id={todo.id}
                defaultChecked={todo.completed}
                onCheckedChange={(completed: boolean) =>
                    handleUpdateTodo({ completed })
                }
                disabled={isLoadingUpdate || todo.id === "created-todo"}
            />
            <Input
                data-testid="todo-input"
                name="title"
                className={cn("border-0", {
                    "line-through": todo.completed,
                })}
                defaultValue={todo.title}
                disabled={
                    isLoadingUpdate ||
                    todo.completed ||
                    todo.id === "created-todo"
                }
                placeholder={t("todos.create.placeholder")}
                onChange={handleDebouncedChangeTitle}
            />
            <Tooltip>
                <TooltipContent>{t("todos.delete.tooltip")}</TooltipContent>
                <TooltipTrigger asChild>
                    <button
                        data-testid="todo-delete-button"
                        className="disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => onDelete(todo)}
                        disabled={todo.id === "created-todo"}
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </TooltipTrigger>
            </Tooltip>
        </motion.div>
    );
}
