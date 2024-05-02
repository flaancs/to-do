import { userRedirect } from "@/lib/redirect";
import { PropsWithChildren } from "react";

export default async function ListLayout({ children }: PropsWithChildren<{}>) {
  await userRedirect({
    loggedIn: false,
    location: "/auth/login",
  });

  return children;
}
