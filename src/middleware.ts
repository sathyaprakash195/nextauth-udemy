import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPage = path === "/login" || path === "/register";
  const isVerificationPage =
    path === "/verifyemail" || path === "/resetpassword";
  const token = request.cookies.get("token")?.value || "";

  // if path is public and token is present , redirect to home page
  if (isPublicPage && token && !isVerificationPage) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // if path is private and token is not present , redirect to login page
  if (!isPublicPage && !token && !isVerificationPage) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/register",
    "/verifyemail",
    "/resetpassword",
  ],
};
