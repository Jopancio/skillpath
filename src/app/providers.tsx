"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth";
import { ProgressProvider } from "@/hooks/use-progress";
import { CustomCoursesProvider } from "@/hooks/use-custom-courses";
import { AuthGate } from "@/components/layout/AuthGate";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <ProgressProvider>
            <CustomCoursesProvider>
              <AuthGate>{children}</AuthGate>
            </CustomCoursesProvider>
          </ProgressProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
