import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/admin-dashboard/login", "/api/admin/login"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Seamlessly redirect any /admin requests to /admin-dashboard
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const newPath = pathname.replace(/^\/admin/, "/admin-dashboard");
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get("sy_admin_session")?.value;
  const authed = session === "authenticated";

  if (pathname.startsWith("/api/admin")) {
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin-dashboard") && !authed) {
    const loginUrl = new URL("/admin-dashboard/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-dashboard/:path*", "/api/admin/:path*"],
};

