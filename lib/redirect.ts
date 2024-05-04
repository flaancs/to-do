import { createApiCaller } from "@/packages/api";
import { redirect } from "next/navigation";

export interface RedirectOptions {
    loggedIn: boolean;
    location: string;
}

export const userRedirect = async ({ loggedIn, location }: RedirectOptions) => {
    const apiCaller = await createApiCaller();
    const user = await apiCaller.auth.user();

    if (loggedIn === Boolean(user)) return redirect(location);
};
