import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only run middleware on /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page to be accessible
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check for admin session cookie
  const token = req.cookies.get("admin_session")?.value;

  // If not logged in, send to login
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // If token exists, allow
  return NextResponse.next();
}
