"use client";
import { ApiClientProvider } from "@components/providers/api-client";
import { TooltipProvider } from "@components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../ui/toaster";

export interface ClientProviderProps {
    children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProviderProps) {
    return (
        <ApiClientProvider>
            <SessionProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <TooltipProvider>{children}</TooltipProvider>
                    <Toaster />
                </ThemeProvider>
            </SessionProvider>
        </ApiClientProvider>
    );
}
