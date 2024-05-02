import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@lib/utils";
import { createApiCaller } from "@/packages/api";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import "../globals.css";
import { UserContextProvider } from "@/context/user-context";

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

  if (!user) return redirect("/auth/login");

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <UserContextProvider initialUser={user}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
