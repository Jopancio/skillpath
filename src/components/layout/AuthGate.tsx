"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/hooks/use-progress";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import { readOnboardingDraft } from "@/lib/onboarding-draft";

/** Routes that don't require authentication */
const PUBLIC_ROUTES = ["/login", "/", "/sso-callback", "/onboarding"];

/**
 * Gate placed around the app content. Unauthenticated users can browse
 * the landing page and questionnaire. Server-side page and API checks
 * enforce authentication; this gate handles onboarding navigation.
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useAuth();
  const { onboarded, hydrated } = useProgress();
  const { allCourses, hydrated: coursesHydrated } = useCustomCourses();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/login");
      return;
    }
    if (user && hydrated && coursesHydrated && pathname !== "/onboarding" && pathname !== "/sso-callback") {
      const draft = readOnboardingDraft(allCourses.map((c) => c.id), user.id);
      if (draft) {
        router.replace("/onboarding");
        return;
      }
      if (pathname === "/login") {
        router.replace(onboarded ? "/" : "/onboarding");
        return;
      }
    }
    // Signed-in users who haven't finished onboarding must stay in the
    // wizard — any other route bounces back to /onboarding.
    if (
      user &&
      hydrated &&
      !onboarded &&
      pathname !== "/onboarding" &&
      pathname !== "/sso-callback"
    ) {
      router.replace("/onboarding");
    }
  }, [user, isLoaded, hydrated, coursesHydrated, allCourses, onboarded, pathname, router]);

  // Public routes (landing + login) always render. Protected routes only
  // render once auth is loaded and a user is signed in.
  if (PUBLIC_ROUTES.includes(pathname)) return <>{children}</>;
  if (!isLoaded) return null;
  if (!user) return null;
  if (!hydrated || !coursesHydrated || !onboarded) return null;

  return <>{children}</>;
}
