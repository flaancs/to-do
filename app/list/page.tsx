import { Button } from "@/components/ui/button";
import { Task } from "@/components/ui/task";
import { TaskPopover } from "@/components/ui/task-popover";
import { PlusIcon } from "lucide-react";
import moment from "moment";

const tasks = [
  {
    id: "1",
    title: "Buy groceries",
    dueDate: moment().add(1, "day").toDate(),
    color: "blue",
    completed: false,
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Walk the dog",
    dueDate: moment().add(10, "day").toDate(),
    color: "green",
    completed: true,
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Do laundry",
    dueDate: moment().subtract(2, "day").toDate(),
    color: "red",
    completed: false,
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Buy new laundry",
    dueDate: moment().toDate(),
    color: "red",
    completed: false,
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Do dishes",
    color: "gray",
    dueDate: null,
    completed: true,
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function List() {
  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Todo List</h2>
        <TaskPopover>
          <Button size="sm" variant="outline">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </TaskPopover>
      </div>
      <div className="w-full space-y-2">
        {tasks?.length > 0 ? (
          tasks.map((task) => <Task task={task} key={task.id} />)
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
}
