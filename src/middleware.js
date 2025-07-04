import {NextResponse, NextRequest} from "next/server";
// import type {NextRequest} from "next/server";
import { auth } from "../auth.config";

const protectedRoutes = ["/admin", "/profile", "/settings"];

export async function middleware(request) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  // If user tries to access protected route without session, redirect to login
  if (protectedRoutes.includes(pathname) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}