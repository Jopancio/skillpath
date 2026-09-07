import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, request) => {
  // Page access only. AI route handlers retain their own 401 authorization.
  if (/^\/(courses|learn|quiz|certificate|dashboard|profile|settings|mindmap)(\/|$)/.test(request.nextUrl.pathname)) {
    const { userId } = await auth();
    if (!userId) return NextResponse.redirect(new URL("/login", request.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
