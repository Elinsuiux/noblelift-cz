import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy Czech locale prefix → country-style /cz
  if (pathname === "/cs" || pathname.startsWith("/cs/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/cs(?=\/|$)/, "/cz");
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(cz|en|cs)/:path*"],
};
