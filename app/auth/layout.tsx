import { userRedirect } from "@lib/redirect";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren<{}>) {
  await userRedirect({
    loggedIn: true,
    location: "/list",
  });

  return children;
}
