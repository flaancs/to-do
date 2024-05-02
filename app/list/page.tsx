import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDownIcon, PlusIcon } from "lucide-react";

export default function List() {
  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Todo List</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-4 p-4">
            <div className="grid gap-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter task title" />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
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
              <div>
                <Label htmlFor="subtasks">Subtasks</Label>
                <div className="space-y-2">
                  <Input id="subtask-1" placeholder="Enter subtask" />
                </div>
              </div>
            </div>
            <Button>Add Task</Button>
          </PopoverContent>
        </Popover>
      </div>
      <Collapsible className="space-y-2">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="flex items-center space-x-4">
            <Checkbox id="task-1" />
            <span className="font-medium text-gray-500">
              Finish project proposal
            </span>
          </div>
          <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pl-8">
          <div className="flex items-center space-x-4">
            <Checkbox id="subtask-1" />
            <span className="text-green-500">Research industry trends</span>
          </div>
          <div className="flex items-center space-x-4">
            <Checkbox id="subtask-2" />
            <div className="flex flex-col gap-1">
              <span>Outline key sections</span>
              <span className="text-xs text-yellow-600">
                This task is due today
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Checkbox id="subtask-3" />
            <div className="flex flex-col gap-1">
              <span>Write first draft</span>
              <span className="text-xs text-red-600">This task is overdue</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
