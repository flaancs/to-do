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
import BlankUser from "/public/blank-user.jpeg";

export function UserMenu() {
    const { user, logout } = useUser();

    if (!user) return null;

    return (
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
                <DropdownMenuItem onClick={logout}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Update profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
