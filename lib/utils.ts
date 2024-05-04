import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Tasks } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const sortTasks = (tasks: Tasks) => {
  if (!tasks) return [];
  return (
    tasks
      .sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1,
      ) || []
  );
};
