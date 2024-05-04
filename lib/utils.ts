import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Todos } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const sortTodos = (todos: Todos) => {
  if (!todos) return [];
  return (
    todos
      .sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1,
      ) || []
  );
};
