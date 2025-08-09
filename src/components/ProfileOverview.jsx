import { UserRound } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function ProfileOverview({showAbove, author}) {
  return (
    <div className={`absolute z-50 left-0 bg-white border border-stone-300 w-84 p-5 rounded-xl shadow-lg ${showAbove ? 'bottom-full mb-0' : 'top-full mt-0'} `}>
        <div className='flex justify-between'>
            <h2 className='text-xl font-semibold'>{author.username}</h2>
            {
                author?.profileImage 
                ?(
                    <div className='w-16 h-16 border border-stone-300 rounded-full  text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                        <Image src={`${author?.profileImage}`} alt="profile Image" width={64} height={64} unoptimized />
                    </div>
                ):(
                    <div className='w-16 h-16 border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                        <UserRound fill="white" strokeWidth={0} size={60} className='relative top-2' />
                    </div>
                )
            }
        </div>
        <div>
            <p className='whitespace-pre-line line-clamp-1'>{author?.bio}</p>
            <p className='text-stone-400'>{author?.followers?.length} followers</p>
        </div>
        <div className='text-center text-white py-1.5 mt-2 w-full rounded-xl bg-[#F27C3A]'>
            Follow
        </div>
    </div>
  )
}

export default ProfileOverview
