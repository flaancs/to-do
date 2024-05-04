"use client";

import { Button } from "@components/ui/button";
import { UndoIcon } from "lucide-react";
import Link from "next/link";

export default function Error() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-2xl">
                Sorry, something has gone wrong on our end, please try again
            </p>
            <Button asChild className="mt-4">
                <Link href="/">
                    <UndoIcon className="mr-2 h-4 w-4" /> Go to homepage
                </Link>
            </Button>
        </div>
    );
}
