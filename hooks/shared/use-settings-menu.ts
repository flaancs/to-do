import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export const useSettingsMenu = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentLocale = useLocale();
    const { resolvedTheme, setTheme, theme } = useTheme();
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [value, setValue] = useState<string>(theme ?? "system");
    const [locale, setLocale] = useState(currentLocale);
    const { data: session } = useSession();

    const user = useMemo(() => session?.user || null, [session]);

    const handleChangeLocale = (value: string) => {
        setLocale(value);
        router.replace(`/${value}/${pathname}?${searchParams.toString()}`);
    };

    return {
        user,
        resolvedTheme,
        setTheme,
        theme,
        userDialogOpen,
        setUserDialogOpen,
        value,
        setValue,
        locale,
        setLocale,
        handleChangeLocale,
    };
};
