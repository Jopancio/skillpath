"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useAuth as useClerkAuth, useClerk, useUser } from "@clerk/nextjs";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  provider: "google" | "email";
  avatarUrl?: string;
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoaded: boolean;
  hasGoogle: boolean;
  signOut: () => Promise<void>;
  getToken: (options?: { template?: string }) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const { getToken: clerkGetToken } = useClerkAuth();

  // Map Clerk's user to the shape the rest of the app already consumes.
  const mapped = useMemo<AuthUser | null>(() => {
    if (!isSignedIn || !user) return null;
    const primary = user.primaryEmailAddress?.emailAddress;
    return {
      id: user.id,
      name: user.fullName || user.username || primary?.split("@")[0] || "Pengguna",
      email: primary ?? "",
      provider: user.externalAccounts.some((acc) => acc.provider === "google")
        ? "google"
        : "email",
      avatarUrl: user.imageUrl,
      createdAt: user.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }, [isSignedIn, user]);

  const signOut = useCallback(async () => {
    await clerkSignOut();
  }, [clerkSignOut]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: mapped,
      isLoaded,
      hasGoogle: true,
      signOut,
      getToken: clerkGetToken,
    }),
    [mapped, isLoaded, signOut, clerkGetToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
