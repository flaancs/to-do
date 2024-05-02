import { ThemeProvider } from "next-themes";
import { ApiClientProvider } from "@/components/providers/api-client";
import { UserContextProvider } from "@/context/user-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ApiOutput } from "@/packages/api";

export interface ClientProviderProps {
  user: ApiOutput["auth"]["user"] | null;
  children: React.ReactNode;
}

export function ClientProviders({ user, children }: ClientProviderProps) {
  return (
    <ApiClientProvider>
      <UserContextProvider initialUser={user}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </UserContextProvider>
    </ApiClientProvider>
  );
}
