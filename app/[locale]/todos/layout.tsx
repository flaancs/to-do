import { auth } from "@packages/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
    const session = await auth();

    if (!session || !session.user) {
        return redirect("/auth/login");
    }

    return children;
}
