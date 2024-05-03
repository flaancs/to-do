"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../shared/label";
import { Form, Formik } from "formik";
import { FieldError } from "../shared/field-error";
import { useTaskDialog } from "@/hooks/task/use-task-dialog";
import moment from "moment";
import type { Task } from "@lib/types";

export interface TaskDialogProps {
  open: boolean;
  onCreated: () => void;
  onUpdated: () => void;
  onOpenChange: (open: boolean) => void;
}

export function TaskDialog({
  open,
  onCreated,
  onUpdated,
  onOpenChange,
}: TaskDialogProps) {
  const {
    calendarPopoverOpen,
    setCalendarPopoverOpen,
    formValidationSchema,
    handleSubmit,
    isLoading,
  } = useTaskDialog({
    onCreated,
    onUpdated,
    onOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <Formik
          enableReinitialize
          validationSchema={formValidationSchema}
          initialValues={{
            title: "",
            dueDate: undefined,
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue, errors }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="title"
                  title="Title"
                  requiredText="Task title is required"
                  required
                />
                <Input
                  value={values.title}
                  name="title"
                  id="title"
                  placeholder="Enter task title"
                  onChange={handleChange}
                />
                <FieldError error={errors.title} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="due-date" title="Due Date" />
                <Popover
                  open={calendarPopoverOpen}
                  onOpenChange={setCalendarPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      onClick={() =>
                        setCalendarPopoverOpen(!calendarPopoverOpen)
                      }
                      className="h-auto w-full flex-col items-start"
                      variant="outline"
                    >
                      <span className="font-normal">
                        {values.dueDate
                          ? moment(values.dueDate).format("MMM D, YYYY")
                          : "Select a date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-1">
                    <Calendar
                      selected={values.dueDate}
                      onDayClick={(val) => {
                        setFieldValue("dueDate", val);
                        setCalendarPopoverOpen(false);
                      }}
                      id="due-date"
                    />
                    <FieldError error={errors.dueDate} />
                  </PopoverContent>
                </Popover>
              </div>
              <Button disabled={isLoading} loading={isLoading} type="submit">
                Create task
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
