import type { Task as TaskDB } from "@packages/db";

export type Task = TaskDB;
export type Tasks = Task[] | undefined;
