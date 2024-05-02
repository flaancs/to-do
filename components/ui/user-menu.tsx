"use client";
import BlankUser from "/public/blank-user.jpeg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useUser } from "@/context/user-context";

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
          <LogOutIcon className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
