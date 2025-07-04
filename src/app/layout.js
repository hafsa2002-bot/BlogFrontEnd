import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import AdminSideLayout from "@/components/AdminSideLayout";
import ClientSideLayout from "@/components/ClientSideLayout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react"

export const metadata = {
  title: "My Blog",
  description: "A modern blog with admin panel",
};

export default function RootLayout({ children }) {
  // const pathname = headers().get("x-next-url") || "/"
  // const isAdminRoute = pathname.startsWith("/admin")
  return (
    <html lang="en">
      <body  className='bg-[#FAF7F0]'>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
