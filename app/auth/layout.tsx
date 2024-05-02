import { UserContextProvider } from "@/context/user-context";
import { userRedirect } from "@/lib/redirect";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren<{}>) {
  await userRedirect({
    loggedIn: true,
    location: "/list",
  });

  return (
    <div className="mx-auto flex min-h-screen flex-col justify-center">
      <UserContextProvider initialUser={null}>{children}</UserContextProvider>
    </div>
  );
}
