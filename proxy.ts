import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "./utils/sessions";

export async function proxy(request: NextRequest) {
  const isAuthorized = await checkAuth();

  const protectedRoutes = [
    "/dashboard",
    "/profil",
    "/generation",
    "/recette",
    "/liste-courses",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && isAuthorized.status >= 300) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }

  return NextResponse.next();
}