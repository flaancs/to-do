import { TrashIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";

export function TodoCardSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center gap-4">
      <Checkbox disabled />
        <Skeleton className="w-full h-8" />
      <button disabled>
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
