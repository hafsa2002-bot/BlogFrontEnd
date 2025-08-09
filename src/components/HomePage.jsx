import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SideBar from './User/SideBar'
// import ExplorePosts from './ExplorePosts'
import { useSession } from 'next-auth/react'
import NewPost from './User/NewPost'
import Post from './User/Post'
import { SendHorizonal, UserRound } from 'lucide-react'
import axios from 'axios'
import MiniSpinner from './MiniSpinner'
import Image from 'next/image'

function HomePage() {
  const [showNewPost, setShowNewPost] = useState(false)
  const [userInfo, setUserInfo] = useState({}) 
  const [loadingInfo, setLoadingInfo] = useState(true)
  const {data: session, status} = useSession()
  const isLoggedIn = session?.user
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUserInfo = async () => {
    axios.get(`/api/users/${session?.user?.id}`)
      .then(response => setUserInfo(response.data))
      .catch(err => console.log("Error: ", err))
      .finally(() => setLoadingInfo(false))
  }
  
  const fetchPosts = () => {
    axios.get("/api/posts")
      .then((res) => setPosts(res.data))
      .catch((error) => console.log("Error: ", error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchUserInfo()
    fetchPosts()
  }, [])

  // useEffect(() => {
  // }, [])

  return (
    <div className='flex justify-between w-full'>
        <div className='w-9/12 mb-10'>
          {/* <ExplorePosts/> */}
          <div className='flex flex-col items-center gap-4'>
            {
              isLoggedIn && !loadingInfo && (
                <div className='bg-white  rounded-xl pl-5 pr-4 py-6  flex gap-4 w-full'>
                  {/* <div className=' w-9 h-9 '>
                    <div className=' w-full h-full border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                      <UserRound fill="white" strokeWidth={0} size={40} className='relative top-2' />
                    </div>
                  </div> */}
                  <div className=' w-9 h-9 flex justify-center items-center'>
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
                  <div className='flex flex-col gap-2 w-11/12 items-start '>
                    <div className='flex justify-between gap-2 w-full '>
                      {/* <input 
                          className=' w-10/12 border border-stone-300 px-3 py-1.5 rounded-xl '
                          onClick={() => setShowNewPost(true)} 
                          type="text" 
                          placeholder='Tell your friends about your thoughts...' 
                      /> */}
                      <div
                          onClick={() => setShowNewPost(true)} 
                          className=' w-10/12 border border-stone-300 text-stone-500 px-2 py-1.5 rounded-xl '
                      >
                          Tell your friends about your thoughts...
                      </div>
                      
                      <div
                          onClick={() => setShowNewPost(true)}  
                          className=' flex justify-center items-center gap-1.5 w-2/12 px-1.5 py-1.5 rounded-xl bg-[#F27C3A] text-white '
                      >
                          Post <SendHorizonal size={17}/> 
                      </div>
                      {
                          showNewPost && <NewPost setShowNewPost={setShowNewPost} posts={posts} setPosts={setPosts} author={userInfo} />
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
                    <div key={index} className={`px-5 ${ index !== posts.length-1 && 'border-b border-stone-300'}`}>
                      <Post post={post} key={index} index={index} onPostDeleted={fetchPosts} />
                    </div>
                  ))
                )
              }
            </div>
          </div>
        </div>
        <div className='w-1/12 '>
        </div>
    </div>
  )
}

export default HomePage
