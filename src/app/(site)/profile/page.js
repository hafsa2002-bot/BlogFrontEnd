// 'use server'
// import { auth } from "@/auth";
"use client"
import {useSession} from "next-auth/react"

export default function ProfilePage() {
    // const session = await auth()
    const {data: session, status} = useSession()

    if(status === "loading") return <p className="text-3xl font-semibold">Loading...</p>
    if(!session) return <p>You must be logged in</p>
  return (
    <div>
        <h1 className="text-2xl font-semibold">User Signed in with name: <span className="text-base">{session?.user?.email}</span></h1>
    </div>
  )
}
