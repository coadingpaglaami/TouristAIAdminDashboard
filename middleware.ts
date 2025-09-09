import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/admin/login",
  "/admin/forget-password",
  "/admin/verifyotp",
  "/admin/reset-password",
  "/admin/success",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  // Case 1: Public routes (login, etc.)
  if (publicRoutes.includes(pathname)) {
    if (token) {
      // Already logged in → redirect away
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Case 2: Protected admin routes (require token)
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Case 3: everything else → allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
}