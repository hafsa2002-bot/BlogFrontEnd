// 'use server'
// import { auth } from "@/auth";
"use client"
import Loader from "@/components/Loader"
import NewPost from "@/components/User/NewPost"
import axios from "axios"
import { Bookmark, BookMarked, Grid3X3, NotebookPen, SendHorizonal, Settings, User2, UserRound } from "lucide-react"
import {useSession} from "next-auth/react"
import { useEffect, useState } from "react"
import Image from "next/image";
import Post from "@/components/User/Post"

export default function ProfilePage() {
  const [posts, setPosts] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const {data: session, status} = useSession()
  const [showNewPost, setShowNewPost] = useState(false)

  const fetchUserInfo = async () => {
    axios.get("/api/users/me")
      .then(response => setUserInfo(response.data))
      .catch(err => console.log("Error: ", err))
  }
  const fetchUserPosts = () => {
    axios.get(`/api/posts/${session?.user?.id}`)
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
    <div className="bg-white px-7 pt-5 mb-10 rounded-2xl w-10/12">
        {
          !loading
          ? (
            <div className=" flex flex-col items-center">
              <div className="flex justify-between mb-14 mt-5 w-11/12 ">
                <div className="">
                  {
                    userInfo?.profileImage 
                    ? (
                      <div className="w-28 h-28 bg-stone-300 rounded-full border border-stone-400 overflow-hidden">
                        {/* <img src={`${userInfo?.profileImage}`} alt="profile image" /> */}
                        <Image src={`${userInfo?.profileImage}`} width={112} height={112} alt="profile image" className="object-cover" unoptimized />
                      </div>
                    ):(
                      // <div className="w-34 h-34 bg-stone-200 flex justify-center items-center rounded-full border border-stone-400 overflow-hidden">
                      //   <User2 size={130} fill="gray" strokeWidth={0} className="relative top-5" />
                      // </div>
                      <div className=' w-34 h-34 '>
                          <div className=' w-full h-full border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                              <UserRound fill="white" strokeWidth={0} size={130} className='relative top-5' />
                          </div>
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
                    {userInfo?.bio}
                  </div>
                </div>
              </div>

              <div className="w-11/12">
                <div className=" flex justify-center gap-5 items-center border-b border-stone-300 text-[15px]">
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
                  <div>

                  </div>
                  <div>
                    {
                      posts.length > 0 
                      ? (
                        <div className="">
                          {/* new post input */}
                          <div className=' py-6 px-4  flex gap-4 w-full border-b border-stone-300'>
                            <div className=' w-9 h-9 relative flex justify-center items-center'>
                              {
                                userInfo?.profileImage
                                ? (
                                  <div className='w-full h-full border border-stone-300 rounded-full  flex justify-center items-center overflow-hidden cursor-pointer ' >
                                      <Image src={`${userInfo?.profileImage}`} width={36} height={36} alt='profile image' className='object-cover' unoptimized />
                                  </div>
                                ):(
                                  <div className=' w-full h-full border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                                      <UserRound fill="white" strokeWidth={0} size={40} className='relative top-2' />
                                  </div>
                                )
                              }
                            </div>
                            <div className='w-11/12 items-start'>
                                <div className='flex justify-between  w-full '>
                                    <div
                                      onClick={() => setShowNewPost(true)} 
                                      className=' w-10/12 border-stone-300 text-stone-500  py-1.5 rounded-xl '
                                    >
                                      Tell your friends about your thoughts...
                                    </div>
                                    <div
                                        onClick={() => setShowNewPost(true)}  
                                        className=' flex justify-center items-center gap-1.5  px-2 py-1.5 rounded-xl font-semibold bg-[#F27C3A] text-white '
                                    >
                                        Post <SendHorizonal size={17} className=""/> 
                                    </div>
                                    {
                                        showNewPost && <NewPost setShowNewPost={setShowNewPost} />
                                    }
                                </div>
                            </div>
                          </div>

                          {/* posts */}
                          {posts?.map((post, index) => (
                            <Post post={post} key={index}  index={index} length={posts.length } />
                          ))}
                        </div>
                      ): (
                        <div className="h-70 w-full text-3xl font-semibold text-stone-500 flex flex-col justify-center items-center">
                          <div className="w-14 h-14 rounded-full border-3  flex justify-center items-center">
                            <NotebookPen size={30} />
                          </div>
                          No posts Yet
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <Loader/>
          )
        }
    </div>
  )
}
