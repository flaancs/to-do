import { Skeleton } from "../ui/skeleton";

export function TaskCardSkeleton() {
  return (
    <Skeleton className="flex h-16 w-full items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-6 w-60" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-6" />
      </div>
    </Skeleton>
  );
}
