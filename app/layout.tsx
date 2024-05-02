import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@lib/utils";
import { ApiClientProvider } from "@/components/providers/api-client";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import type { Metadata } from "next";
import "./globals.css";
import { createApiCaller } from "@/packages/api";
import { UserMenu } from "@/components/ui/user-menu";
import { UserContextProvider } from "@/context/user-context";
import NextTopLoader from "nextjs-toploader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "To-do App",
  description: "A simple to-do app built with Next.js and TypeScript.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextTopLoader />
        <ApiClientProvider>
          <UserContextProvider initialUser={user}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <nav className="absolute left-0 top-0 flex w-full justify-between px-8 py-4">
                <Logo />
                <div className="flex items-center gap-4">
                  <UserMenu />
                  <ThemeToggle />
                </div>
              </nav>
              {children}
            </ThemeProvider>
          </UserContextProvider>
        </ApiClientProvider>
      </body>
    </html>
  );
}
