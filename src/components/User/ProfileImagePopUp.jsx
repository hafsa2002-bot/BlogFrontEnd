import { UserRound, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Unknown from '../Unknown'

function ProfileImagePopUp({setShowProfileImage, photo}) {
  return (
    <div  
        className='w-screen h-screen cursor-default top-0  right-0 fixed z-50 flex flex-col items-center ' 
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
    >
        <div className="absolute top-5 left-7 ">
            <div
                onClick={() => setShowProfileImage(false)} 
                className='flex justify-center items-center text-stone-300 w-9 h-9 bg-stone-700 cursor-pointer rounded-full'
            >
                <X/>
            </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
            {
                photo 
                ? (
                    <div className="w-72 h-72 bg-stone-300 rounded-full border border-stone-400 overflow-hidden">
                        {/* <img src={`${userInfo?.profileImage}`} alt="profile image" /> */}
                        <Image src={`${photo}`} width={288} height={288} alt="profile image" className="object-cover" unoptimized />
                    </div>
                ):(
                    <div className=' w-74 h-74 '>
                        <div className=' w-full h-full border-5 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                            <UserRound fill="white" strokeWidth={0} size={270} className='relative top-9' />
                        </div>
                    </div>
                    // <Unknown width={74} height={74} size={230} top={8} />
                )
            }
        </div>
    </div>
  )
}

export default ProfileImagePopUp
