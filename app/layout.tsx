import { Inter as FontSans } from "next/font/google";
import { cn } from "@lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Logo } from "@/components/shared/logo";
import type { Metadata } from "next";
import "./globals.css";
import { createApiCaller } from "@/packages/api";
import { UserMenu } from "@/components/shared/user-menu";
import NextTopLoader from "nextjs-toploader";
import { ClientProviders } from "@/components/providers/client-providers";
import Link from "next/link";

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
          "bg-background font-sans antialiased min-h-screen",
          fontSans.variable
        )}
      >
        <NextTopLoader />
        <ClientProviders user={user}>
          <nav className="absolute left-0 top-0 flex w-full justify-between px-8 py-4">
            <Logo />
            <div className="flex items-center gap-4">
              <UserMenu />
              <ThemeToggle />
            </div>
          </nav>
          <main className="mx-auto flex min-h-screen flex-col justify-center">
            {children}
          </main>
          <footer className="sticky bottom-4">
          <div className="flex w-full items-center justify-center">
              <Link
                className="flex items-center gap-2 pb-2 pt-8 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                href="https://github.com/flaancs/to-do"
                target="_blank"
              >
                <GithubIcon />
                <span>
                  View source on <span className="font-semibold">GitHub</span>
                </span>
              </Link>
            </div>
          </footer>
        </ClientProviders>
      </body>
    </html>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M20 10.25c0 2.234-.636 4.243-1.908 6.027c-1.271 1.784-2.914 3.018-4.928 3.703c-.234.045-.406.014-.514-.093a.539.539 0 0 1-.163-.4V16.67c0-.863-.226-1.495-.677-1.895a8.72 8.72 0 0 0 1.335-.24c.394-.107.802-.28 1.223-.52a3.66 3.66 0 0 0 1.055-.888c.282-.352.512-.819.69-1.402c.178-.583.267-1.252.267-2.008c0-1.077-.343-1.994-1.028-2.75c.32-.81.286-1.717-.105-2.723c-.243-.08-.594-.03-1.054.147a6.94 6.94 0 0 0-1.198.587l-.495.32a9.03 9.03 0 0 0-2.5-.346a9.03 9.03 0 0 0-2.5.347a11.52 11.52 0 0 0-.553-.36c-.23-.143-.593-.314-1.088-.514c-.494-.2-.868-.26-1.12-.18c-.381 1.005-.412 1.912-.09 2.722c-.686.756-1.03 1.673-1.03 2.75c0 .756.09 1.423.268 2.002c.178.578.406 1.045.683 1.401a3.53 3.53 0 0 0 1.048.894c.421.24.83.414 1.224.52c.395.108.84.188 1.335.241c-.347.32-.56.779-.638 1.375a2.539 2.539 0 0 1-.586.2a3.597 3.597 0 0 1-.742.067c-.287 0-.57-.096-.853-.287c-.282-.192-.523-.47-.723-.834a2.133 2.133 0 0 0-.631-.694c-.256-.178-.471-.285-.645-.32l-.26-.04c-.182 0-.308.02-.378.06c-.07.04-.09.09-.065.153a.738.738 0 0 0 .117.187a.961.961 0 0 0 .17.16l.09.066c.192.09.38.259.567.508c.187.249.324.476.41.68l.13.307c.113.338.304.612.574.821c.269.21.56.343.872.4c.312.058.614.09.905.094c.29.004.532-.011.723-.047l.299-.053c0 .338.002.734.007 1.188l.006.72c0 .16-.056.294-.17.4c-.112.108-.286.139-.52.094c-2.014-.685-3.657-1.92-4.928-3.703C.636 14.493 0 12.484 0 10.25c0-1.86.447-3.574 1.341-5.145a10.083 10.083 0 0 1 3.64-3.73A9.6 9.6 0 0 1 10 0a9.6 9.6 0 0 1 5.02 1.375a10.083 10.083 0 0 1 3.639 3.73C19.553 6.675 20 8.391 20 10.25"
      />
    </svg>
  );
}
