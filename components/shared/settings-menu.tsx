"use client";
import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useSettingsMenu } from "@hooks/shared/use-settings-menu";
import {
    LanguagesIcon,
    LogOutIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon,
    UserIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useIsClient } from "usehooks-ts";
import { UserDialog } from "./user-dialog";
import BlankUser from "/public/blank-user.jpeg";

export function SettingsMenu() {
    const t = useTranslations();
    const {
        user,
        logout,
        resolvedTheme,
        setTheme,
        userDialogOpen,
        setUserDialogOpen,
        value,
        setValue,
        locale,
        handleUserUpdated,
        handleChangeLocale,
    } = useSettingsMenu();
    const isClient = useIsClient();

    if (!isClient) {
        return null;
    }

    return (
        <>
            <UserDialog
                open={userDialogOpen}
                onOpenChange={setUserDialogOpen}
                user={user}
                onUserUpdated={handleUserUpdated}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="secondary">
                        <SettingsIcon className="w-5 h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-56">
                    {user && (
                        <>
                            <DropdownMenuLabel>
                                <div className="flex gap-2 items-center">
                                    <Image
                                        src={user.avatarUrl || BlankUser}
                                        alt={user.name}
                                        width={35}
                                        height={35}
                                        className="rounded-full"
                                    />
                                    <div className="space-y-1">
                                        <span>{user.name}</span>
                                        <span className="block text-xs font-normal opacity-70">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </>
                    )}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <LanguagesIcon className="mr-2 h-4 w-4" />
                            {t("site.language")}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={locale}
                                    onValueChange={handleChangeLocale}
                                >
                                    <DropdownMenuRadioItem value="en">
                                        English
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="es">
                                        Español
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            {resolvedTheme === "light" ? (
                                <MoonIcon className="mr-2 h-4 w-4" />
                            ) : (
                                <SunIcon className="mr-2 h-4 w-4" />
                            )}
                            {t("theme.toggle")}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={value}
                                    onValueChange={(value) => {
                                        setTheme(value);
                                        setValue(value);
                                    }}
                                >
                                    <DropdownMenuRadioItem value="light">
                                        {t("theme.light")}
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="dark">
                                        {t("theme.dark")}
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="system">
                                        {t("theme.system")}
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {user && (
                        <>
                            <DropdownMenuItem
                                onClick={() => setUserDialogOpen(true)}
                            >
                                <UserIcon className="mr-2 h-4 w-4" />
                                {t("user.update.title")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>
                                <LogOutIcon className="mr-2 h-4 w-4" />
                                {t("user.logout")}
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
