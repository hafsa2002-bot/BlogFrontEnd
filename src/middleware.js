import {NextResponse, NextRequest} from "next/server";
// import type {NextRequest} from "next/server";
import { auth } from "../auth.config";

const protectedRoutes = ["/admin", "/profile", "/settings", "/post"];

export async function middleware(request) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user tries to access protected route without session, redirect to login
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}