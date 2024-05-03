import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@lib/api-client";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import type { Task } from "@lib/types";
import { useMemo, useState } from "react";

export interface useTaskDialogProps {
  initialValues?: Task | null;
  onCreated: () => void;
  onUpdated: () => void;
  onOpenChange: (open: boolean) => void;
}

const TaskFormValidationSchema = z.object({
  title: z.string({
    required_error: "Task title is required",
  }),
  dueDate: z
    .date({
      invalid_type_error: "Invalid date",
    })
    .optional(),
});

const formValidationSchema = toFormikValidationSchema(TaskFormValidationSchema);

export const useTaskDialog = ({
  onCreated,
  onUpdated,
  onOpenChange,
  initialValues,
}: useTaskDialogProps) => {
  const { toast } = useToast();
  const [calendarPopoverOpen, setCalendarPopoverOpen] = useState(false);
  const utils = apiClient.useUtils();

  const createTaskMutation = apiClient.tasks.create.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Task created",
        description: "Task has been created successfully",
      });
      onCreated();
      utils.tasks.findAll.setData(undefined, (oldTasks) => {
        const newTasks = oldTasks?.map((task) => {
          if (task.id === "created-task") {
            return data;
          }
          return task;
        }) || []; 
        return newTasks;
      });
    },
    onError: () => {
      onOpenChange(true);
      toast({
        title: "An error occurred",
        description: "An error occurred while creating the task",
      });
    },
    onMutate: async (newTask) => {
      utils.tasks.findAll.setData(undefined, (oldTasks) => {
        const task = {
          id: "created-task",
          title: newTask.title,
          dueDate: newTask.dueDate || null,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: "",
        };
        const newTasks = [task, ...(oldTasks || [])];
        return newTasks;
      });
    },
  });

  const updateTaskMutation = apiClient.tasks.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Task updated",
        description: "Task has been updated successfully",
      });
      onUpdated();
    },
    onError: () => {
      toast({
        title: "An error occurred",
        description: "An error occurred while updating the task",
      });
    },
    onMutate: async (updatedTask) => {
      utils.tasks.findAll.setData(undefined, (oldTasks) => {
        return oldTasks?.map((task) => {
          if (task.id === updatedTask.id) {
            return { ...task, ...updatedTask };
          }
          return task;
        });
      });
    },
  });

  const isLoading = useMemo(
    () => updateTaskMutation.isPending || createTaskMutation.isPending,
    [updateTaskMutation.isPending, createTaskMutation.isPending],
  );

  const handleSubmit = async (values: { title: string; dueDate?: Date }) => {
    onOpenChange(false);
    if (initialValues) {
      await updateTaskMutation.mutateAsync({
        id: initialValues.id,
        ...values,
      });
    } else {
      await createTaskMutation.mutateAsync(values);
    }
  };

  return {
    calendarPopoverOpen,
    setCalendarPopoverOpen,
    formValidationSchema,
    handleSubmit,
    isLoading,
  };
};
