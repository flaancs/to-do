"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useUser } from "@context/user-context";
import { LogOutIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UserDialog } from "./user-dialog";
import BlankUser from "/public/blank-user.jpeg";

export function UserMenu() {
    const { user, logout, reloadUser } = useUser();
    const [userDialogOpen, setUserDialogOpen] = useState(false);

    if (!user) return null;

    const handleUserUpdated = () => {
        reloadUser();
        setUserDialogOpen(false);
    };

    return (
        <>
            <UserDialog
                open={userDialogOpen}
                onOpenChange={setUserDialogOpen}
                user={user}
                onUserUpdated={handleUserUpdated}
            />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Image
                        src={user.avatarUrl || BlankUser}
                        alt={user.name}
                        width={35}
                        height={35}
                        className="rounded-full"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        {user.name}
                        <span className="block text-xs font-normal opacity-70">
                            {user.email}
                        </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setUserDialogOpen(true)}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        Update profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
