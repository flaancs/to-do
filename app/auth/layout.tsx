import { UserContextProvider } from "@/context/user-context";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren<{}>) {
  return (
    <UserContextProvider initialUser={null}>{children}</UserContextProvider>
  );
}
