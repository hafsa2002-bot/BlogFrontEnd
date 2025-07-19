'use client'
import { Facebook, Github, Home, Instagram, Plus, Tag, Twitch, Twitter } from "lucide-react";
import Link from "next/link";
import ExplorePosts from "@/components/ExplorePosts";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function Explore(){
    const {data: session, status} = useSession()
    const isLoggedIn = session?.user
    const router = useRouter()
    const tags = [
        "#webdev",
        "#programming",
        "#javascript",
        "#beginners",
        "#ai",
        "#java",
        "#devops",
        "#productivity",
        "#rust",
        "#python",
        "#tutorial",
        "#react",
        "#aws",
        "#discuss",
        "#career",
        "#opensource",
        "#learning",
        "#news",
        "#machinelearning",
        "#typescript",
        "#css",
        "#security",
        "#node",
        "#cloud",
        "#frontend",
        "#database",
        "#softwaredevelopment",
        "#api",
        "#development",
        "#php",
    ]

    useEffect(() => {
        if (isLoggedIn || status === "loading") {
            router.push("/")
        }
    }, [isLoggedIn, router, status])

    if (status === "loading" || isLoggedIn) return <Loader/>

    return (
        <div className="text-black flex justify-between  px-4">
            {/* left side */}
            <div className="w-[20%] flex flex-col gap-3 ">
                <div className=" bg-white border border-stone-300 rounded-xl flex flex-col justify-center items-center gap-2 p-3">
                    <h2 className="font-semibold text-2xl">Floren is a creative space for thinkers, writers, and idea sharers.</h2>
                    <p className="text-stone-500">Join a growing community where you can express yourself, explore new thoughts, and connect with others.</p>
                    <Link href="/register" className='cursor-pointer w-full text-center bg-[#F27C3A] px-4 py-1.5 rounded-full font-semibold text-sm text-white'>Create account</Link>
                    <Link href="/login" className='text-[#F27C3A] w-full text-center cursor-pointer hover:border hover:border-[#F27C3A]  px-2.5 py-1.5 rounded-full font-semibold text-sm'>Log in</Link>
                </div>
                <div>
                    <ul className=" ">
                        <li className="hover:bg-[#F27C3A] px-3 py-1.5 rounded-lg" >
                            <Link href="/"  className="flex items-center gap-1.5 hover:underline" >
                                {/* <img className="w-6 h-6" src="/images/icons8-home-48.png" alt="home icon" /> */}
                                <Image
                                    src="/images/icons8-home-48.png"
                                    width={24}
                                    height={24}
                                    alt="home icon"
                                />
                                Home
                            </Link>
                        </li>
                        <li className="hover:bg-[#F27C3A] px-3 py-1.5 rounded-lg">
                            <Link href="/" className="flex items-center gap-1.5  hover:underline" >
                                {/* <img className="w-6 h-6" src="/images/icons8-label-emoji-48.png" alt="tags" /> */}
                                <Image 
                                    // className="w-6 h-6" 
                                    width={24}
                                    height={24}
                                    src="/images/icons8-label-emoji-48.png" 
                                    alt="tags" 
                                />
                                
                                Tags
                            </Link>
                        </li>
                        <li className="hover:bg-[#F27C3A] px-3 py-1.5 rounded-lg">
                            <Link href="/" className="flex items-center gap-1.5 hover:underline" >
                                {/* <img  className="w-6 h-6" src="/images/icons8-smiling-face-with-sunglasses-48.png"  alt="about"/> */}
                                <Image  
                                    // className="w-6 h-6"
                                    width={24}
                                    height={24} 
                                    src="/images/icons8-smiling-face-with-sunglasses-48.png"  
                                    alt="about"
                                />
                                About
                            </Link>
                        </li>
                        <li className="hover:bg-[#F27C3A] px-3 py-1.5 rounded-lg">
                            <Link href="/" className="flex items-center gap-1.5 hover:underline" >
                                {/* <img className="w-6 h-6" src="/images/icons8-open-mailbox-with-raised-flag-48.png" alt="contact" /> */}
                                <Image
                                    width={24}
                                    height={24} 
                                    src="/images/icons8-open-mailbox-with-raised-flag-48.png" 
                                    alt="contact" 
                                />
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="px-3">
                    <h3 className="text-lg my-2 font-semibold ">Other</h3>
                    <div className="flex justify-between">
                        <Twitter fill="#000000" strokeWidth="0" />
                        <Facebook fill="#000000" strokeWidth="0"/>
                        <Github/>
                        <Instagram/>
                        <Twitch/>
                    </div>
                </div>
                <div className="px-3">
                    <h3 className="font-family:var(--font-geist-sans)">Popular Tags</h3>
                    <ul className="w-full h-52 overflow-y-scroll">
                        {
                            tags.map((tag, index) => (
                                <li key={index}>{tag}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            {/* posts */}
            <div className="w-[56%] bg-white rounded-2xl overflow-hidden border border-stone-300 shadow-xl ">
                <ExplorePosts/>
            </div>

            {/* right */}
            <div className="w-[20%] "></div>
            <div 
                className="bg-white group rounded-2xl cursor-pointer shadow-xl border border-stone-200 text-stone-800 fixed bottom-7 right-7 w-18 h-12 flex justify-center items-center"
            >
                <Plus size={30} />
                <div className="absolute  top-9 left-7  hidden group-hover:block bg-white border border-black text-black px-2 py-1  text-sm">
                    Create
                </div>
            </div>
        </div>
    )
}