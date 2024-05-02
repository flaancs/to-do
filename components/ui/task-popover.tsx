import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Task } from "@/prisma";

export interface TaskPopoverProps {
  children: React.ReactNode;
  initialValues?: Task;
}

export function TaskPopover({ children, initialValues }: TaskPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 space-y-4 p-4">
        <div className="grid gap-2">
          <div>
            <Label htmlFor="title">Title (required)</Label>
            <Input id="title" required placeholder="Enter task title" />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date (optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="h-auto w-full flex-col items-start"
                  variant="outline"
                >
                  <span className="font-normal">Select a date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-1">
                <Calendar />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <RadioGroup defaultValue="gray" id="color">
              <div className="flex items-center gap-2">
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-full border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-gray"
                >
                  <RadioGroupItem id="color-gray" value="gray" />
                  <div className="h-5 w-5 rounded-full bg-gray-500" />
                </Label>
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-full border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-blue"
                >
                  <RadioGroupItem id="color-blue" value="blue" />
                  <div className="h-5 w-5 rounded-full bg-blue-500" />
                </Label>
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-full border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-green"
                >
                  <RadioGroupItem id="color-green" value="green" />
                  <div className="h-5 w-5 rounded-full bg-green-500" />
                </Label>
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-full border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  htmlFor="color-red"
                >
                  <RadioGroupItem id="color-red" value="red" />
                  <div className="h-5 w-5 rounded-full bg-red-500" />
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Button>Add Task</Button>
      </PopoverContent>
    </Popover>
  );
}
