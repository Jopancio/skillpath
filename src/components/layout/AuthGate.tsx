"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/hooks/use-progress";

/** Routes that don't require authentication */
const PUBLIC_ROUTES = ["/login", "/", "/sso-callback"];

/**
 * Gate placed around the app content. Unauthenticated users can browse
 * the public landing page; protected routes redirect back to the landing
 * page where they can log in. Keeps the layout (navbar/footer) visible.
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useAuth();
  const { onboarded, hydrated } = useProgress();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/");
      return;
    }
    // Signed-in users who haven't finished onboarding must stay in the
    // wizard — any other route bounces back to /onboarding.
    if (
      user &&
      hydrated &&
      !onboarded &&
      pathname !== "/onboarding" &&
      !PUBLIC_ROUTES.includes(pathname)
    ) {
      router.replace("/onboarding");
    }
  }, [user, isLoaded, hydrated, onboarded, pathname, router]);

  // Public routes (landing + login) always render. Protected routes only
  // render once auth is loaded and a user is signed in.
  if (PUBLIC_ROUTES.includes(pathname)) return <>{children}</>;
  if (!isLoaded) return null;
  if (!user) return null;

  return <>{children}</>;
}
