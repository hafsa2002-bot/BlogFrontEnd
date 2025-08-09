'use client'
import { Facebook, Github, Home, Instagram, Plus, SendHorizonal, Tag, Twitch, Twitter, UserRound } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Post from "@/components/User/Post";
import MiniSpinner from "@/components/MiniSpinner";
import NewPost from "@/components/User/NewPost";
import axios from 'axios'

export default function Explore(){
    const [showNewPost, setShowNewPost] = useState(false)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
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

    useEffect(() => {
        axios.get("/api/posts")
            .then((res) => setPosts(res.data))
            .catch((error) => console.log("Error: ", error))
            .finally(() => setLoading(false))
    }, [])

    if (status === "loading" || isLoggedIn) return <Loader/>

    return (
        <>
            <Navbar/>
            <div className="text-black flex justify-between gap-14 px-8 pt-28">
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
                    {/* <ExplorePosts/> */}
                    <div className='flex flex-col items-center gap-4'>
                        {
                            isLoggedIn && (
                            <div className='bg-white  rounded-xl pl-5 pr-4 py-6  flex gap-4 w-full'>
                                <div className=' w-9 h-9 '>
                                <div className=' w-full h-full border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                                    <UserRound fill="white" strokeWidth={0} size={40} className='relative top-2' />
                                </div>
                                </div>
                                <div className='flex flex-col gap-2 w-11/12 items-start '>
                                <div className='flex justify-between gap-2 w-full '>
                                    <input 
                                        className=' w-10/12 border border-stone-300 px-3 py-1.5 rounded-xl '
                                        onClick={() => setShowNewPost(true)} 
                                        type="text" 
                                        placeholder='Tell your friends about your thoughts...' 
                                    />
                                    <div
                                        onClick={() => setShowNewPost(true)}  
                                        className=' flex justify-center items-center gap-1.5 w-2/12 px-1.5 py-1.5 rounded-xl bg-[#F27C3A] text-white '
                                    >
                                        Post <SendHorizonal size={17}/> 
                                    </div>
                                    {
                                        showNewPost && <NewPost setShowNewPost={setShowNewPost} />
                                    }
                                </div>
                                {/* <div className='border border-stone-300 text-stone-500 font-semibold cursor-pointer rounded-lg flex gap-2 px-2 py-1 justify-center items-center text-sm'>
                                    <Images size={17} />
                                    Photo
                                </div> */}
                                </div>
                            </div>
                            )
                        }
                        <div className='bg-white rounded-xl w-full'>
                            {
                                loading 
                                ? (
                                    <div className='h-[80vh] flex justify-center items-center' >
                                    <MiniSpinner/>
                                    </div>
                                ) : (
                                    
                                    posts?.map((post, index)=> (
                                    <div className='px-4' key={index}>
                                        <Post post={post} key={index} index={index} />
                                    </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* right */}
                <div className="w-[20%] "></div>
                
            </div>
        </>
    )
}