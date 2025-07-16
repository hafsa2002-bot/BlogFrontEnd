// 'use server'
// import { auth } from "@/auth";
"use client"
import Loader from "@/components/Loader"
import axios from "axios"
import { Bookmark, BookMarked, Grid3X3, Settings, User2 } from "lucide-react"
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
    <div className="bg-white px-7 py-5 rounded-2xl">
        {
          !loading
          ? (
            <>
              <div className="flex justify-between mb-14 ">
                <div className="">
                  {
                    userInfo?.profileImage 
                    ? (
                      <div className="w-28 h-28 bg-stone-300 rounded-full border border-stone-400 overflow-hidden">
                        <img src={`${userInfo?.profileImage}`} alt="profile image" />
                      </div>
                    ):(
                      <div className="w-34 h-34 bg-stone-200 flex justify-center items-center rounded-full border border-stone-400 overflow-hidden">
                        <User2 size={130} fill="gray" strokeWidth={0} className="relative top-5" />
                      </div>
                    )
                  }
                </div>
                <div className="flex flex-col gap-4 w-9/12">
                  <div className="flex items-center justify-between  w-8/12">
                    <h3 className="font-semibold text-xl">{userInfo?.username}</h3>
                    <div className="flex gap-4 items-center">
                      <div className="font-semibold hover:bg-[#F27C3A] bg-[#F27C3A]/80  text-white rounded-lg py-1.5 px-4 cursor-pointer">Edit Profile</div>
                      <Settings size={21} className="cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-between w-6/12">
                    <div className="text-stone-500 flex gap-1.5"><span className="text-black font-semibold">{posts?.length}</span>posts </div>
                    <div className="text-stone-500 flex gap-1.5 cursor-pointer"><span className="text-black font-semibold">{userInfo?.followers?.length}</span>followers</div>
                    <div className="text-stone-500 flex gap-1.5 cursor-pointer"><span className="text-black font-semibold">{userInfo?.following?.length}</span>following</div>
                  </div>
                  <div className="w-8/12 text-[15px] mt-2">
                    {/* <ul>
                      <li>🌸 Just a girl chasing sunsets & good vibes</li>
                      <li>📷 Lover of photography, colors, and tiny details</li>
                      <li>✨ Living one snapshot at a time</li>
                      <li>💬 DM me for collabs & good coffee recs ☕💕</li>
                    </ul> */}
                    {userInfo?.bio}
                  </div>
                </div>
              </div>

              <div className="w-11/12">
                <div className=" flex justify-center gap-5 items-center border-b border-stone-400 text-[15px]">
                  <div className="cursor-pointer flex gap-1 items-center font-medium border-b px-2.5 pb-1.5">
                    <Grid3X3 size={18} />
                    Posts
                  </div>
                  <div className="cursor-pointer flex gap-1 items-center text-stone-500 px-2 pb-1.5">
                    <Bookmark size={18} />
                    Saved
                  </div>
                </div>
                <div>
                  <ul>
                    {posts?.map((post) => (
                      <li key={post._id} className="p-2 my-2">
                        <p>{post.content}</p>
                        <p className="text-sm text-gray-500">{post.createdAt}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )
          : (
            <Loader/>
          )
        }












        <div>
          <div className="text-4xl font-semibold text-red-500">
            {userInfo?.email}
            {userInfo?._id}
          </div>
          <div></div>
        </div>
        <h1 className="text-2xl font-semibold pt-28">User Signed in with name: <span className="text-base">{session?.user?.email}</span></h1>

        <h2 className="text-xl font-semibold">My Posts</h2>
        
    </div>
  )
}
