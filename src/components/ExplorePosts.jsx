'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import posts from '../data/posts.json'
import { Heart, Image, Images, MessageCircle, Plus, SendHorizonal, User, UserRound } from 'lucide-react'
import ProfileOverview from './ProfileOverview'
import { useSession } from 'next-auth/react'

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
                            <div className=' flex justify-center items-center gap-1.5  px-1.5 py-1.5 rounded-xl bg-[#F27C3A] text-white '>
                                Post <SendHorizonal size={17}/> 
                            </div>
                            {
                                showNewPost && (
                                    <div className='absolute top-0 bg-red-500 rounded-lg text-white text-3xl font-semibold'>Hello</div>
                                )
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
        <div className='bg-white rounded-xl'>
            {
                posts?.map((post, index)=> (
                    <div key={index} className=' border-stone-300   pl-5 pr-4 py-4 border-b flex gap-4 cursor-pointer'>

                        {/* <div></div> */}
                        <div className='relative w-9 h-9 '>
                            <div className=' w-full h-full border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                                <UserRound fill="white" strokeWidth={0} size={40} className='relative top-2' />
                            </div>
                            <div className='absolute z-40 bg-[#F27C3A] text-white w-5 h-5 border-2 border-white rounded-full -bottom-1 -right-1 flex justify-center items-center'>
                                <Plus size={10} />
                            </div>

                        </div>
                        <div className='w-11/12'>
                            <div className='flex items-center gap-1.5'>
                                <div 
                                    className='relative font-semibold hover:underline cursor-pointer'
                                    onMouseEnter={(e) =>{
                                        const x = e.currentTarget.getBoundingClientRect()
                                        const spaceBelow = window.innerHeight - x.bottom
                                        setShowAbove(spaceBelow < 200)
                                        setShowProfile(index)
                                    }}
                                    onMouseLeave={() => setShowProfile(null)}
                                >
                                    User name
                                    {
                                        showProfile === index && 
                                            <ProfileOverview showAbove={showAbove} />
                                    }
                                </div>
                                <p className='text-stone-400'>11 h</p>
                            </div>
                            <div>
                                {/* content */}
                                <p>{post.body} </p>
                                {/* photo if it exist */}
                                {
                                    post.image && 
                                        <img 
                                            src={`${post.image}`} 
                                            alt={post.title} 
                                            className='max-h-[430px] max-w-[530px] mt-4 rounded-xl border border-stone-300'
                                        />
                                }
                                
                            </div>
                            <div className='flex gap-3 mt-2 text-stone-700'>
                                <div className='flex gap-1 items-center hover:bg-stone-100 cursor-pointer p-2 rounded-full'>
                                    <Heart size={20} />
                                    <p className='text-sm'>{post.reactions.likes}</p>
                                </div>
                                <div className='flex gap-1 items-center hover:bg-stone-100 cursor-pointer p-2 rounded-full'>
                                    <MessageCircle className='-scale-x-100'  size={20} />
                                    <p className='text-sm'>{post.reactions.comments > 0 && post.reactions.comments}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ExplorePosts
