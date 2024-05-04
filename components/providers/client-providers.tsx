import { ApiClientProvider } from "@/components/providers/api-client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserContextProvider } from "@/context/user-context";
import { ApiOutput } from "@/packages/api";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../ui/toaster";

export interface ClientProviderProps {
    user: ApiOutput["auth"]["user"] | null;
    children: React.ReactNode;
}

export function ClientProviders({ user, children }: ClientProviderProps) {
    return (
        <ApiClientProvider>
            <UserContextProvider initialUser={user}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <TooltipProvider>{children}</TooltipProvider>
                    <Toaster />
                </ThemeProvider>
            </UserContextProvider>
        </ApiClientProvider>
    );
}
