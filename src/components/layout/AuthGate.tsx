"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

/** Routes that don't require authentication */
const PUBLIC_ROUTES = ["/login", "/"];

/**
 * Gate placed around the app content. Unauthenticated users can browse
 * the public landing page; protected routes redirect back to the landing
 * page where they can log in. Keeps the layout (navbar/footer) visible.
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/");
    }
    if (user && pathname === "/login") {
      router.replace("/");
    }
  }, [user, pathname, router]);

  // Public routes (landing + login) always render. Protected routes only
  // render when a user is signed in.
  if (PUBLIC_ROUTES.includes(pathname)) return <>{children}</>;
  if (!user) return null;

  return <>{children}</>;
}
