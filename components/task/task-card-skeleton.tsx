import { TrashIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";

export function TaskCardSkeleton() {
  return (
      <div className="flex items-center gap-4 w-full animate-pulse">
        <Checkbox disabled />
        <div className="grid grid-cols-12 gap-4 w-full">
          <Skeleton className="h-8 col-span-7" />
          <Skeleton className="h-8 col-span-5" />
        </div>
        <button disabled>
            <TrashIcon className="w-4 h-4" />
          </button>
      </div>
  );
}
