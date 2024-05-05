import { useUser } from "@context/user-context";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useSettingsMenu = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentLocale = useLocale();
    const { user, logout, reloadUser } = useUser();
    const { resolvedTheme, setTheme, theme } = useTheme();
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [value, setValue] = useState<string>(theme ?? "system");
    const [locale, setLocale] = useState(currentLocale);

    const handleUserUpdated = () => {
        if (!user) return;
        reloadUser();
        setUserDialogOpen(false);
    };

    const handleChangeLocale = (value: string) => {
        setLocale(value);
        router.replace(`/${value}/${pathname}?${searchParams.toString()}`);
    };

    return {
        user,
        logout,
        resolvedTheme,
        setTheme,
        theme,
        userDialogOpen,
        setUserDialogOpen,
        value,
        setValue,
        locale,
        setLocale,
        handleUserUpdated,
        handleChangeLocale,
    };
};
