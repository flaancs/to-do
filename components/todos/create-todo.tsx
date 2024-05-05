"use client";
import { useCreateTodo } from "@hooks/todo/use-create-todo";
import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function CreateTodo() {
    const t = useTranslations();
    const {
        titleInput,
        setTitleInput,
        handleCreateTodo,
        handleKeyDown,
        createTodoMutation,
    } = useCreateTodo();

    return (
        <div className="flex w-full items-center gap-4">
            <Input
                value={titleInput}
                onChange={(e) => setTitleInput(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("todos.create.placeholder")}
                disabled={createTodoMutation.isPending}
            />
            <Tooltip>
                <TooltipContent>{t("todos.create.submit")}</TooltipContent>
                <TooltipTrigger asChild>
                    <button
                        className="disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={handleCreateTodo}
                        disabled={!titleInput || createTodoMutation.isPending}
                    >
                        <CheckIcon className="h-4 w-4" />
                    </button>
                </TooltipTrigger>
            </Tooltip>
        </div>
    );
}
