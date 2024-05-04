import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Todos } from "./types";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const sortTodos = (todos: Todos) => {
    if (!todos) return [];
    return (
        todos.sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? 1 : -1,
        ) || []
    );
};

export const generateToken = (length: number): string => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }

    return result;
};

export const handleRedirect = (route: string) => {
    window.location.href = new URL(
        route,
      window.location.origin,
    ).toString();
  };