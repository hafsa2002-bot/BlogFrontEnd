'use client'
// import { headers } from "next/headers";
import AdminSideLayout from "@/components/AdminSideLayout";
import ClientSideLayout from "@/components/ClientSideLayout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const array = ["/login", "/register"]
  const {data: session, status} = useSession()
  const isLoggedIn = session?.user
  // const pathname = headers().get("x-next-url") || "/"
  // const isAdminRoute = pathname.startsWith("/admin")
  return (
    <div className={`bg-[#FAF7F0] ${ (array.includes(pathname) || isLoggedIn  ? '' : 'pt-28')}`}>
        {/* {
          isAdminRoute ? (
            <AdminSideLayout>{children}</AdminSideLayout>
          ) : (
            <ClientSideLayout>{children}</ClientSideLayout>
          )
        } */}
        <Navbar />
        <main>{children}</main>
        <Footer />
    </div>
  );
}
