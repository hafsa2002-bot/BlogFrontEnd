import { Heart, MessageCircle, Plus, UserRound } from 'lucide-react'
import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import ProfileOverview from '../ProfileOverview'
import Image from 'next/image'

function Post({post, index, length}) {
    const [showProfile, setShowProfile] = useState(null)
    const [showAbove, setShowAbove] = useState(false)
    const [showNewPost, setShowNewPost] = useState(false)
    const {data: session, status} = useSession()
    const isLoggedIn = session?.user
  return (
    <div className={`  pl-4 pr-4 py-4  flex gap-4 cursor-pointer ${index !== length-1 && 'border-b border-stone-300'}`}>
        <div className=' relative w-9 h-9 flex justif-center items-center'>
            {
                post?.author?.profileImage
                ? (
                    <div className='w-full h-full border border-stone-300 rounded-full  flex justify-center items-center overflow-hidden cursor-pointer ' >
                        <Image src={`${post?.author?.profileImage}`} width={36} height={36} alt='profile image' className='object-cover' unoptimized />
                    </div>
                ):(
                    <div className=' w-full h-full border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                        <UserRound fill="white" strokeWidth={0} size={40} className='relative top-2' />
                    </div>
                )
            }
            {
                session?.user?.id !== post?.author?._id && (
                    <div className='absolute z-40 bg-[#F27C3A] text-white w-5 h-5 border-2 border-white rounded-full -bottom-1 -right-1 flex justify-center items-center'>
                        <Plus size={10} />
                    </div>
                )
            }
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
                    {post?.author?.username}
                    {
                        showProfile === index && 
                            <ProfileOverview showAbove={showAbove} author={post.author} />
                    }
                </div>
                <p className='text-stone-400'>11 h</p>
            </div>
            <div>
                {/* content */}
                <p>{post?.content} </p>
                
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
            <div className='flex gap-3 items-center mt-2 text-stone-700'>
                <div className='flex gap-1 text-sm justify-center items-center hover:bg-stone-100 cursor-pointer p-2 rounded-full'>
                    <Heart size={20} />
                    {
                        post?.likes?.length === 1 ? <p>{post?.likes?.length} like</p>
                        : post?.likes?.length > 1 ? <p>{post?.likes?.length} likes</p>
                        : null
                    }
                    
                </div>
                <div className='flex gap-1 text-sm  justify-center items-center hover:bg-stone-100 cursor-pointer p-2 rounded-full'>
                    <MessageCircle className='-scale-x-100'  size={20} />
                    {
                        post?.comments?.length === 1 ? <p>{post?.commentss?.length} comment</p>
                        : post?.comments?.length > 1 ? <p>{post?.comments?.length} comments</p>
                        : null
                    }
                    {/* <p className='text-sm'>{post?.comments?.length > 0 && post.comments.length}</p> */}
                </div>
            </div>

        </div>
    </div>
  )
}

export default Post
