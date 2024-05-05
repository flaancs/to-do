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
                placeholder={t("todos.create.placeholder")}
                onChange={handleDebouncedChangeTitle}
            />
            <Tooltip>
                <TooltipContent>{t("todos.delete.tooltip")}</TooltipContent>
                <TooltipTrigger asChild>
                    <button
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
