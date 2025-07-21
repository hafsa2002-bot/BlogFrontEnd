'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import posts from '../data/posts.json'
import { Heart, Image, Images, MessageCircle, Plus, SendHorizonal, User, UserRound } from 'lucide-react'
import ProfileOverview from './ProfileOverview'
import { useSession } from 'next-auth/react'
import NewPost from './User/NewPost'
import Post from './User/Post'

function ExplorePosts() {
    const [showProfile, setShowProfile] = useState(null)
    const [showAbove, setShowAbove] = useState(false)
    const [showNewPost, setShowNewPost] = useState(false)
    const {data: session, status} = useSession()
    const isLoggedIn = session?.user
  return (
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
                posts?.map((post, index)=> (
                    <Post post={post} key={index} index={index} />
                ))
            }
        </div>
    </div>
  )
}

export default ExplorePosts
