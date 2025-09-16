import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/admin/login",
  "/admin/forget-password",
  "/admin/verifyotp",
  "/admin/reset-password",
  "/admin/success",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // Case 1: Public routes (login, etc.)
  if (publicRoutes.includes(pathname)) {
    if (accessToken) {
      // Already logged in → redirect away
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Case 2: Protected admin routes (require token)
  if (pathname.startsWith("/admin")) {
    if (!accessToken) {
      if (refreshToken) {
        try {
          const res = await fetch(
            "https://ppp7rljm-8000.inc1.devtunnels.ms/admin-api/token/refresh/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh: refreshToken }),
            }
          );
          if (res.ok) {
            const data = await res.json();
            const newAccessToken = data.access;
            const response = NextResponse.next();

            response.cookies.set("access_token", newAccessToken, {
              path: "/admin/dashboard",
              maxAge: 600,
            });
            console.log("Access token refreshed successfully");
            return response;
          } else {
            return  NextResponse.redirect(
              new URL("/admin/login", req.url)
            );
          }
        } catch (error) {
          console.log("Error refreshing token:", error);
          const response = NextResponse.redirect(
            new URL("/admin/login", req.url)
          );
          return response;
        }
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Case 3: everything else → allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
