import { TrashIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";

export function TaskCardSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center gap-4">
      <Checkbox disabled />
      <div className="grid w-full grid-cols-12 gap-4">
        <Skeleton className="col-span-7 h-8" />
        <Skeleton className="col-span-5 h-8" />
      </div>
      <button disabled>
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
