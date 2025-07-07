'use client'
// import { headers } from "next/headers";
import AdminSideLayout from "@/components/AdminSideLayout";
import ClientSideLayout from "@/components/ClientSideLayout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import SideBar from "@/components/User/SideBar";
import ExplorePosts from "@/components/ExplorePosts";
import Loader from "@/components/Loader";

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const array = ["/login", "/register"]
  const {data: session, status} = useSession()
  const isLoggedIn = session?.user
  // const pathname = headers().get("x-next-url") || "/"
  // const isAdminRoute = pathname.startsWith("/admin")
  if(status === "loading") return <Loader/>
  return (
    <div className={`bg-[#FAF7F0] ${ (array.includes(pathname) || isLoggedIn  ? '' : '')}`}>
        {/* {
          isAdminRoute ? (
            <AdminSideLayout>{children}</AdminSideLayout>
          ) : (
            <ClientSideLayout>{children}</ClientSideLayout>
          )
        } */}

        <div className='flex gap-26 px-4 w-full '>
            <div className='w-[17%] h-screen '>
                <SideBar/>
            </div>
            <div  className=' w-[70%] rounded-xl overflow-hidden mt-10'>
                {/* <ExplorePosts/> */}
                <main>{children}</main>
            </div>
            {/* <div className='w-[20%]'>

            </div> */}
        </div>
        {/* <Navbar /> */}
        <Footer />
    </div>
  );
}
