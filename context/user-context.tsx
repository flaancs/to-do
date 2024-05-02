"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApiOutput } from "@packages/api";
import { apiClient } from "@lib/api-client";

type User = ApiOutput["auth"]["user"];

type UserContext = {
  user: User;
  reloadUser: () => Promise<void>;
  logout: () => Promise<void>;
  loaded: boolean;
};

const authBroadcastChannel = new BroadcastChannel("auth");
type AuthEvent = {
  type: "loaded" | "logout";
  user: User | null;
};

export const userContext = createContext<UserContext>({
  user: null,
  reloadUser: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loaded: false,
});

export function UserContextProvider({
  children,
  initialUser,
}: PropsWithChildren<{
  initialUser: User;
}>) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(!!initialUser);
  const [user, setUser] = useState<User>(initialUser);
  const queryClient = useQueryClient();
  const userQuery = apiClient.auth.user.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !initialUser,
  });
  const logoutMutation = apiClient.auth.logout.useMutation();

  const reloadUser = async () => {
    await userQuery.refetch();
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    queryClient.removeQueries({ queryKey: getQueryKey(apiClient.auth) });
    setUser(null);
    authBroadcastChannel.postMessage({
      type: "logout",
      user: null,
    } satisfies AuthEvent);
    router.replace("/auth/login");
  };

  useEffect(() => {
    if (userQuery.data) setUser(userQuery.data);
  }, [userQuery.data]);

  useEffect(() => {
    if (userQuery.isSuccess) setLoaded(true);
  }, [userQuery.isSuccess]);

  useEffect(() => {
    if (user && loaded)
      authBroadcastChannel.postMessage({
        type: "loaded",
        user: user,
      });
  }, [user, loaded]);

  useEffect(() => {
    const handleAuthEvent = async (event: MessageEvent<AuthEvent>) => {
      if (JSON.stringify(event.data.user) !== JSON.stringify(user)) {
        if (event.data.type === "logout") {
          queryClient.removeQueries({ queryKey: getQueryKey(apiClient.auth) });
          setUser(null);
          router.replace("/");
        } else {
          setUser(event.data.user);
        }
      }
    };

    authBroadcastChannel.addEventListener("message", handleAuthEvent);

    return () =>
      authBroadcastChannel.removeEventListener("message", handleAuthEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <userContext.Provider
      value={{
        user,
        reloadUser,
        logout,
        loaded,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);
  return context;
}
