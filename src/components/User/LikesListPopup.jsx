import { UserRound, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Unknown from '../Unknown'
import axios from 'axios'
import MiniSpinner from '../MiniSpinner'
import Link from 'next/link'

function LikesListPopup({postId, setShowLikedUsers}) {
    const [likedUsers, setLikedUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchLikedUsers = () => {
        axios.get(`/api/post/${postId}/like`)
            .then(res => setLikedUsers(res.data))
            .catch(err => console.log("Error: ", err))
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        fetchLikedUsers()
    }, [])
  return (
    <div className='w-screen h-screen cursor-default top-0  right-0 fixed z-50 flex justify-center items-center ' style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        {
            loading
            ? (
                <div className='bg-white rounded-2xl border border-stone-300 flex justify-center items-center w-32 h-32 '>
                    <MiniSpinner/>
                </div>
            ) : (
                <div className="w-1/3  text-black rounded-lg bg-white ">
                    <div className='flex justify-between items-center border-b border-stone-300 px-4 py-2'>
                        <div></div>
                        <div className='font-semibold text-lg'>
                            Likes
                        </div>
                        <div 
                            onClick={() => setShowLikedUsers(false)}
                            className="cursor-pointer w-9 h-9 rounded-full flex justify-center items-center hover:bg-stone-100"
                        >
                            <X/>
                        </div>
                    </div>
                    <div className='overflow-y-scroll max-h-64 py-1.5 pl-4 pr-2'>
                        {
                            likedUsers.map((user, index) => (
                                <div key={index} className='flex justify-between mb-2 '>
                                    <div className='flex gap-1.5 items-center'>
                                        <div>
                                            {
                                                user?.profileImage !== ""
                                                    ?(
                                                        <Image src={`${user?.profileImage}`} width={32} height={32} alt={`${user.username}`} className='rounded-full border border-stone-300' unoptimized />
                                                    ):(
                                                        <Unknown width={8} height={8} size={30} top={1} />
                                                    )
                                            }
                                        </div>
                                        <div className='text-sm font-semibold'>
                                            <Link href={`/${user?._id}`} className='hover:underline'>
                                                {user?.username || ''}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='text-center text-white p-1.5 rounded-xl bg-[#F27C3A] font-semibold '>
                                        Follow
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default LikesListPopup
