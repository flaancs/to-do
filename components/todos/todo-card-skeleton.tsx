import { TrashIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";

export function TodoCardSkeleton() {
    return (
        <Skeleton className="w-full h-9">
            <div className="w-full h-full flex items-center justify-between px-2">
                <Checkbox disabled />
                <button disabled className="opacity-50">
                    <TrashIcon className="h-4 w-4" />
                </button>
            </div>
        </Skeleton>
    );
}
