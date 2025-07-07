// 'use server'
// import { auth } from "@/auth";
"use client"
import Loader from "@/components/Loader"
import axios from "axios"
import {useSession} from "next-auth/react"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [posts, setPosts] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const {data: session, status} = useSession()

  const fetchUserInfo = async () => {
    axios.get("/api/users/me")
      .then(response => setUserInfo(response.data))
      .catch(err => console.log("Error: ", err))
  }
  const fetchUserPosts = () => {
    axios.get("/api/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.log("Error: ", error))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchUserInfo()
    fetchUserPosts()
    // console.log("session: ", session)
  }, [])

  // if(status === "loading" || loading) return <Loader/>
  if(!session) return <p>You must be logged in</p>
  return (
    <div className="border">
        {/* user info */}
        <div>
          <div className="text-4xl font-semibold text-red-500">
            {userInfo?.email}
            {userInfo?._id}
          </div>
          <div></div>
        </div>
        <h1 className="text-2xl font-semibold pt-28">User Signed in with name: <span className="text-base">{session?.user?.email}</span></h1>

        <h2 className="text-xl font-semibold">My Posts</h2>
        <ul>
          {posts?.map((post) => (
            <li key={post._id} className="border p-2 my-2">
              <p>{post.content}</p>
              <p className="text-sm text-gray-500">{post.createdAt}</p>
            </li>
          ))}
        </ul>
    </div>
  )
}
