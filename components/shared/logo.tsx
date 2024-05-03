import { CheckSquareIcon } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <CheckSquareIcon size={24} />
        <h1 className="text-2xl font-bold">
          <span className="text-red-600">to</span>do
        </h1>
      </div>
    </Link>
  );
}
