import { ClientProviders } from "@components/providers/client-providers";
import { Footer } from "@components/shared/footer";
import { Logo } from "@components/shared/logo";
import { SettingsMenu } from "@components/shared/settings-menu";
import { cn } from "@lib/utils";
import { createApiCaller } from "@packages/api";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Inter as FontSans } from "next/font/google";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { getMessagesForLocale } from "../../i18n";
import "../globals.css";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export async function generateMetadata() {
    const t = await getTranslations();
    return {
        title: "Todo App",
        description: t("site.description"),
    };
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const apiCaller = await createApiCaller();
    const user = await apiCaller.auth.user();

    const locale = useLocale();

    if (params.locale !== locale) notFound();

    const messages = await getMessagesForLocale(locale);

    return (
        <html lang={locale}>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <NextTopLoader />
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ClientProviders user={user}>
                        <nav className="absolute left-0 top-0 flex w-full justify-between px-8 py-4">
                            <Logo />
                            <SettingsMenu />
                        </nav>
                        <main className="mx-auto flex min-h-screen flex-col justify-center">
                            {children}
                        </main>
                        <Footer />
                    </ClientProviders>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
