import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/src/lib/jwt";

const PUBLIC_PATHS = ["/login", "/api/ideas", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))
    || pathname.startsWith("/_next")
    || pathname.startsWith("/assets")
    || pathname.startsWith("/favicon")
    || pathname.startsWith("/api/auth");

  if (isPublic) return NextResponse.next();
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  const session = req.cookies.get("session")?.value;
  if (!session || !(await verifySession(session))) {
    const loginUrl = new URL("https://dudester.ventures/login");
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"]
};


