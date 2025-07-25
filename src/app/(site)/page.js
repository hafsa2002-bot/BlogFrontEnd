'use client'
import Image from "next/image";
import Link from "next/link";
import HomePage from "@/components/HomePage";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

export default function Home() {
    // const session = await auth()
    // console.log(session)
    const {data: session, status} = useSession()
    const isLoggedIn = session?.user

    if(status === "loading" ) return <Loader/>
    if(isLoggedIn){
        return (
            <div>
                <HomePage/>
            </div>
        )
    }
  // redirect('/')
  return(
    <div className="bg-[#FAF7F0]">
        <div className='bg-[#FAF7F0] h-[12vh] flex justify-center items-center border-b border-black fixed top-0 w-full z-50'>
            <div className='w-11/12 flex justify-between items-center px-4 py-5'>
            <Link href="/" className='flex items-center gap-1.5 '>
                <div className='w-10'>
                    {/* <img className='w-full' src="/images/logo4.png" /> */}
                    <Image
                        src="/images/logo4.png"
                        alt="Logo"
                        className="w-full"
                        width={40}
                        height={40}
                    />
                </div>
                <div className='text-3xl font-bold text-black mb-1.5'>Floren</div>
            </Link>
            <div className='flex gap-4'>
                <Link href="/" className=' font-semibold cursor-pointer hover:bg-[#fcc7a3] text-sm   px-2.5 py-1.5 rounded-full '>
                    Home
                </Link>
                <Link href="/explore-page" className=' font-semibold cursor-pointer text-sm  hover:bg-[#fcc7a3]  px-2.5 py-1.5 rounded-full '>
                    Explore
                </Link>
                <Link href="/about" className=' font-semibold cursor-pointer hover:bg-[#fcc7a3] text-sm  px-2.5 py-1.5 rounded-full '>
                    About
                </Link>
                <Link href="/contact" className=' font-semibold cursor-pointer hover:bg-[#fcc7a3]  px-2.5 text-sm  py-1.5 rounded-full '>
                    Contact
                </Link>
                <Link href="/login" className='text-[#ec8b4a] cursor-pointer hover:bg-[#F27C3A] hover:text-white px-2.5 py-1.5 rounded-full font-semibold text-sm ml-7'>
                    Log In
                </Link>
                <Link href="/register" className='cursor-pointer bg-[#F27C3A] px-4 py-1.5 rounded-full font-semibold text-sm text-white'>
                    Sign Up 
                </Link>
                {/* <div className='border border-gray-300 text-gray-600 shadow-lg px-2.5 py-1.5 rounded-full font-semibold text-sm '>Sign Up</div> */}
            </div>
            </div>
        </div>
        <section className="flex justify-center overflow-hidden mt-14 " >
            <div className="flex-col flex justify-center min-h-[79vh] w-11/12 pl-4">
                <h1 className="text-8xl  font-serif">
                    Exploring Life <br/> Through Words
                </h1>
                <p className="font-semibold text-xl my-9">A space for thoughtful reading and meaningful writing</p>
                <Link href="/explore-page" className="bg-[#F27C3A] w-48 rounded-full text-center font-semibold py-3 text-xl cursor-pointer hover:bg-transparent border hover:border-2 border-black hover:drop-shadow-lg transition-colors duration-300  ">
                    Start reading
                </Link>
            </div>
            <div className="min-h-[90vh] w-1/3 absolute z-10 right-0 bottom-5">
                {/* <img className="h-full w-full" src="/images/heroSectionPhoto.png" /> */}
                <Image fill className="h-full w-full" src="/images/heroSectionPhoto.png" alt="hero Section Photo" />
            </div>
        </section>
        <Footer />
    </div>
  )
}
