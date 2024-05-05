import { Button } from "@components/ui/button";
import { UndoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
    const t = useTranslations();

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">{t("site.notFound.title")}</h1>
            <p className="mt-2 text-2xl">{t("site.notFound.message")}</p>
            <Button asChild className="mt-4">
                <Link href="/">
                    <UndoIcon className="mr-2 h-4 w-4" /> {t("common.goToHome")}
                </Link>
            </Button>
        </div>
    );
}
