import { ArrowRight, Bookmark, Ellipsis, Heart, MessageCircle, PenLine, Plus, Trash2, UserRound } from 'lucide-react'
import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import ProfileOverview from '../ProfileOverview'
import Image from 'next/image'
import {getShortTimeAgo} from '@/utils/timeAgo'
import DeletePost from './DeletePost'
import Link from 'next/link'
import Like from './Like'
import Comment from './Comment'

function PostById({post, comments, setComments}) {
    const [showProfile, setShowProfile] = useState(false)
    const [showAbove, setShowAbove] = useState(false)
    const [showNewPost, setShowNewPost] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [showPostOptions, setShowPostOptions] = useState(false)
    const [deletePostPopUp, setDeletePostPopUp] = useState(false)
    const {data: session, status} = useSession()
    const isLoggedIn = session?.user

    
  return (
    <div className='flex flex-col px-4 pb-4 gap-1.5 border-b border-stone-300'>
        <div className={`  flex justify-between items-center `}>
            <div className='flex gap-3'>
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
                <div className='flex items-center gap-1.5'>
                    <div 
                        className='relative font-semibold hover:underline cursor-pointer'
                        onMouseEnter={(e) =>{
                            const x = e.currentTarget.getBoundingClientRect()
                            const spaceBelow = window.innerHeight - x.bottom
                            setShowAbove(spaceBelow < 200)
                            // setTimeout(() => setShowProfile(true), 600)
                            setShowProfile(true)
                        }}
                        onMouseLeave={() => setShowProfile(false)}
                    >
                        {post?.author?.username}
                        {
                            showProfile && 
                                <ProfileOverview showAbove={showAbove} author={post.author} />
                        }
                    </div>
                    {/* post time */}
                    <p className='text-stone-400'>
                        { getShortTimeAgo(new Date(post?.createdAt)) }
                    </p>
                </div>
            </div>
            <div className='flex '>
                {/* post options : save, delete */}
                <div>
                    <div
                        onClick={() => setShowPostOptions(!showPostOptions)} 
                        className='relative w-8 h-8 hover:bg-stone-100 rounded-full flex justify-center items-center'
                    >
                        <Ellipsis size={20} className='text-stone-600' />
                        {  
                            showPostOptions && 
                            <div className='absolute top-7 right-1 z-50 w-38 bg-white rounded-md border border-stone-300 text-black overflow-hidden'>
                                <div className='border-b  border-stone-300 p-1 font-medium '>
                                    <div className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'>Save <Bookmark size={21} /></div>
                                </div>
                                <div className='border-b border-stone-300 p-1 font-medium '>
                                    <div className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'>Edit <PenLine size={21}/></div>
                                </div>
                                <div className='border-b border-stone-300 p-1 font-medium '>
                                    <div className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'>Go to Post <ArrowRight size={21}/></div>
                                </div>
                                <div
                                    onClick={() => setDeletePostPopUp(true)} 
                                    className='p-1 font-medium text-red-500'
                                >
                                    <div className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'>Delete <Trash2 size={21}/></div>
                                </div>
                            </div>
                        }
                    </div>
                    {
                        deletePostPopUp && <DeletePost postId={post._id} setDeletePostPopUp={setDeletePostPopUp}  />
                    }
                </div>
            </div>
        </div>
        <div className=''>
            <div>
                {/* content */}
                <Link href={`/post/${post._id}`} className=''>
                    <p className="whitespace-pre-line ">{post?.content} </p>
                </Link>

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
            <div className='flex gap-1.5 items-center mt-1.5 relative right-2 text-stone-700'>
                <Like postId={post?._id} initialLikes={post?.likes} currentUserId={session?.user?.id} />
                <div className='flex gap-1 text-sm  justify-center items-center hover:bg-stone-100 cursor-pointer p-2 rounded-full'>
                    <MessageCircle 
                        onClick={() => setShowComment(!showComment)}
                        className='-scale-x-100'  
                        size={20}
                    />
                    {/* <Comment/> */}
                    {
                        comments?.length > 1 && <p>{comments?.length}</p>
                    }
                </div>
            </div>
        </div>
        {
            showComment && (
                <Comment 
                    author={post.author} 
                    postId={post._id} 
                    comments={comments} 
                    setComments={setComments}
                />
            )
        }
    </div>
  )
}

export default PostById
