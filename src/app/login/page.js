'use client'
import {signIn} from "next-auth/react"
import EmailInput from "@/components/EmailInput"
import PasswordInput from "@/components/PasswordInput"
import Link from "next/link"
import styled from "styled-components"
import { login } from "../../../lib/actions/auth"
import { X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ErrorMessage from "@/components/ErrorMessage"
import Image from "next/image";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email, 
            password
        })

        console.log("Login res:", res);

        if(res?.ok){
            router.push("/profile")
        }else{
            setError(res.error || "Invalid crendentials")
            setTimeout(() => setError(""), 2000)
        }
    }
  return (
    <div className="flex">
        <div className="w-1/2 h-screen flex flex-col items-center justify-center  ">
            <Link href="/" className='cursor-pointer flex items-center gap-1.5 w-7/12 text-start relative bottom-10 mb-3'>
                <div className='w-10'>
                    {/* <img className='w-full' src="/images/logo4.png" /> */}
                    <Image 
                        // className='w-full'
                        width={40} 
                        height={40}
                        src="/images/logo4.png"
                        alt="logo" 
                    />
                </div>
                <div className='text-3xl font-bold text-[#F27C3A] mb-1.5'>Floren</div>
            </Link>
            <div className="w-7/12 text-start">
                <h2 className="text-4xl font-bold font-serif mb-1">Welcome Back!</h2>
                <p className="text-sm text-stone-600">Please enter log in details below</p>
            </div>
            <form onSubmit={handleLogin} className="mt-7 w-7/12 flex flex-col">
                <EmailInput email={email} setEmail={setEmail} />
                <PasswordInput password={password} setPassword={setPassword} />
                {/* <p className="w-full text-end font-semibold text-stone-700 mt-2 mb-5">Forget password?</p> */}
                <button className="bg-[#F27C3A] rounded-xl py-3 text-lg font-semibold text-white mt-5"> Log in </button>
            </form>
            {/* <div className="w-7/12 border-b border-stone-400 text-stone-600 mt-3  ">
                <p className="text-center bg-[#FAF7F0] w-26 m-auto relative top-3 ">or continue</p>
            </div>
            <div className="bg-white w-7/12 flex items-center justify-center font-semibold gap-2 rounded-xl py-3  text-stone-800 mt-7 border border-stone-300 cursor-pointer" > 
                <img className="w-7 h-7" src="/images/icons8-google-48.png" />
                Log in with Google 
            </div> */}
            <div className="w-7/12 border-b border-stone-400 text-stone-600 mt-3  ">
                <p className="text-center bg-[#FAF7F0] w-26 m-auto relative top-3 ">or continue</p>
            </div>
            <button 
                // onClick={() => login()} 
                onClick={() => signIn("github", { callbackUrl: "/profile" })}
                className="bg-white w-7/12 flex items-center justify-center font-semibold gap-2 rounded-xl py-3  text-stone-800 mt-7 border border-stone-300 cursor-pointer" 
            > 
                {/* <img className="w-7 h-7" src="/images/icons8-github-64.png" /> */}
                <Image width={28} height={28} src="/images/icons8-github-64.png" alt="gitHub icon" />
                Log in with GitHub
            </button>

            {/* error message */}
            {/* <div className="fixed top-2 right-1/2 translate-x-1/2 w-fit font-semibold z-50 bg-red-500 text-white  text-sm py-1.5 px-3 rounded-md mt-2 flex justify-center items-center gap-1">
                <X/> Error message
            </div> */}

            <p className="text-stone-600 mt-6 ">{"Don't have an account?"} <Link href="/register" className="text-black font-semibold hover:underline">Sign Up</Link></p>
        </div>

        <div className="w-1/2 p-3">
            <div className="bg-white rounded-tr-xl rounded-br-xl rounded-tl-lg rounded-bl-[80px] h-full flex flex-col justify-center items-center">
                {/* <img className="w-1/2 rotate-12" src="/images/09d24e63-a074-42b3-82ab-5d684666aae4.png"  /> */}
                <div className="w-1/2 relative aspect-[1/1]">
                    <Image className="object-contain rotate-12" fill src="/images/09d24e63-a074-42b3-82ab-5d684666aae4.png" alt="login photo"  />
                </div>
                <h1 className="font-semibold text-3xl mt-2">Your Creative Corner Awaits</h1>
                <p className="text-stone-600 text-lg mt-4  w-1/2 text-center">Start writing, exploring, and connecting through your words.</p>
            </div>
        </div>

        {error && <ErrorMessage message={error} />}
    </div>
  )
}


