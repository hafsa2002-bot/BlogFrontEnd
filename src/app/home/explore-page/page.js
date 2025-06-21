import { Facebook, Github, Home, Instagram, Tag, Twitch, Twitter } from "lucide-react";
import Link from "next/link";

export default function Explore(){
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
    return (
        <div className="text-black flex justify-between px-4">
            {/* left side */}
            <div className="w-[18%] flex flex-col gap-3 ">
                <div className=" bg-white border border-stone-300 rounded-lg flex flex-col justify-center items-center gap-2 p-3">
                    <h2 className="font-semibold text-2xl">Floren is a creative space for thinkers, writers, and idea sharers.</h2>
                    <p className="text-stone-500">Join a growing community where you can express yourself, explore new thoughts, and connect with others.</p>
                    <div className='cursor-pointer w-full text-center bg-[#F27C3A] px-4 py-1.5 rounded-full font-semibold text-sm text-white'>Create account</div>
                    <div className='text-[#F27C3A] w-full text-center cursor-pointer hover:border hover:border-[#F27C3A]  px-2.5 py-1.5 rounded-full font-semibold text-sm'>Log in</div>
                </div>
                <div>
                    <ul className=" ">
                        <li className="hover:bg-[#F27C3A] px-3 py-1.5 rounded-lg" >
                            <Link href="/"  className="flex items-center gap-1.5 hover:underline" >
                                {/* <Home/> */}
                                <img className="w-6 h-6" src="/images/icons8-home-48.png" alt="home icon" />
                                Home
                            </Link>
                        </li>
                        <li className="hover:bg-[#F27C3A] px-3 py-1.5 rounded-lg">
                            <Link href="/" className="flex items-center gap-1.5  hover:underline" >
                                {/* <Tag/> */}
                                <img className="w-6 h-6" src="/images/icons8-label-emoji-48.png" alt="tags" />
                                Tags
                            </Link>
                        </li>
                        <li className="hover:bg-[#F27C3A] px-3 py-1.5 rounded-lg">
                            <Link href="/" className="flex items-center gap-1.5 hover:underline" >
                                <img  className="w-6 h-6" src="/images/icons8-smiling-face-with-sunglasses-48.png"  alt="about"/>
                                About
                            </Link>
                        </li>
                        <li className="hover:bg-[#F27C3A] px-3 py-1.5 rounded-lg">
                            <Link href="/" className="flex items-center gap-1.5 hover:underline" >
                                <img className="w-6 h-6" src="/images/icons8-open-mailbox-with-raised-flag-48.png" alt="contact" />
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
                    <h3>Popular Tags</h3>
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
            <div className="w-3/5 border"></div>
            {/* right */}
            <div className="w-1/5 border"></div>
        </div>
    )
}