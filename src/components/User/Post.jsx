import { ArrowRight, Bookmark, Ellipsis, Heart, MessageCircle, PenLine, Plus, Send, Share, Trash2, UserRound } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import ProfileOverview from '../ProfileOverview'
import Image from 'next/image'
import {getShortTimeAgo} from '@/utils/timeAgo'
import DeletePost from './DeletePost'
import Link from 'next/link'
import Like from './Like'
import Comment from './Comment'
import EditPost from './EditPost'
import SavePost from './SavePost'
import SuccessMessage from '../SuccessMessage'
import { getCurrentUser } from '@/utils/getCurrentUser'

function Post({post, index, length, onPostDeleted}) {
    const [showProfile, setShowProfile] = useState(null)
    const [showAbove, setShowAbove] = useState(false)
    const [showNewPost, setShowNewPost] = useState(false)
    const [showPostOptions, setShowPostOptions] = useState(false)
    const [deletePostPopUp, setDeletePostPopUp] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [comments, setComments] = useState(post?.comments)
    const {data: session, status} = useSession()
    const isLoggedIn = session?.user
    const [editPostPopUp, setEditPostPopUp] = useState(false)
    const postDate = new Date(post?.createdAt)
    const now = new Date()
    const twentyFourHrs = 24 * 60 * 60 * 1000
    const timeDiff = now - postDate
    const isEditable = timeDiff < twentyFourHrs
    const [successMessage, setSuccessMessage] = useState("")
    // const [errorMessage, setErrorMessage] = useState("")
    const [isSaved, setIsSaved] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            if (user && user.savedPosts?.includes(post?._id)) {
                setIsSaved(true);
            }
            // setLoadingUser(false)
        };
        fetchUser();
    }, [post?._id]);
  return (
    <div className="">
        <div className={` py-4  flex gap-3 cursor-pointer `}>
            <div className='relative w-9 h-9 flex justif-center items-center'>
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
                        <div className='absolute z-30 bg-[#F27C3A] text-white w-5 h-5 border-2 border-white rounded-full -bottom-1 -right-1 flex justify-center items-center'>
                            <Plus size={10} />
                        </div>
                    )
                }
            </div>
            <div className='w-11/12'>
                <div className='flex justify-between items-center'>
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
                            <Link  href={`/${post?.author?._id}`}>{post?.author?.username}</Link>
                            {
                                showProfile === index && 
                                    <ProfileOverview showAbove={showAbove} author={post.author} />
                            }
                        </div>
                        {/* post time */}
                        <p className='text-stone-400'>
                            { getShortTimeAgo(new Date(post?.createdAt)) }
                        </p>
                    </div>
                    {/* post options : save, delete */}
                    <div>
                        <div
                            onClick={() => setShowPostOptions(!showPostOptions)} 
                            className='relative w-8 h-8 hover:bg-stone-100 rounded-full flex justify-center items-center'
                        >
                            <Ellipsis size={20} className='text-stone-600' />
                            {  
                                showPostOptions && 
                                <div className='absolute top-7 right-1 z-50 w-38 bg-white rounded-xl border border-stone-300 text-black overflow-hidden'>
                                    <div className='border-b  border-stone-300 p-1 font-medium '>
                                        <SavePost 
                                            postId={post?._id} 
                                            // initiallySaved={post?.savedByCurrentUser}  
                                            setSuccessMessage={setSuccessMessage}
                                            isSaved={isSaved}
                                            setIsSaved={setIsSaved}
                                        />
                                    </div>
                                    {
                                        (session?.user?.id === post?.author?._id && isEditable)
                                        ? (
                                            <div
                                                onClick={() => setEditPostPopUp(true)} 
                                                className='border-b border-stone-300 p-1 font-medium '
                                            >
                                                <div className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'>
                                                    Edit <PenLine size={21}/>
                                                </div>
                                            </div>
                                        ): (session?.user?.id === post?.author?._id && !isEditable) ?(
                                            <div className='border-b border-stone-300 p-1 font-medium '>
                                                <div className='hover:bg-stone-100 text-gray-400 p-2 rounded-lg flex items-center justify-between'>
                                                    {/* Edit <PenLine size={21}/> */}
                                                    {/* Editing disabled after 24 hours  */}
                                                    Edit limit: 24h
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                    <div className='border-b border-stone-300 p-1 font-medium '>
                                        <Link href={`/post/${post._id}`} className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'>
                                            Go to Post <ArrowRight size={21}/>
                                        </Link>
                                    </div>
                                    {
                                        session?.user?.id === post?.author?._id && (
                                            <div
                                                onClick={() => setDeletePostPopUp(true)} 
                                                className='p-1 font-medium text-red-500'
                                            >
                                                <div className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'>
                                                    Delete <Trash2 size={21}/>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            }
                        </div>
                        {
                            deletePostPopUp && <DeletePost postId={post._id} setDeletePostPopUp={setDeletePostPopUp} onPostDeleted={onPostDeleted}  />
                        }
                        {editPostPopUp && 
                            <EditPost 
                                postId={post?._id} 
                                // setPost={setPost} 
                                content={post?.content} 
                                setEditPostPopUp={setEditPostPopUp} 
                                author={post?.author}
                            />
                        }
                    </div>
                </div>
                <div>
                    {/* content */}
                    <Link href={`/post/${post._id}`} className=''>
                        <p className="whitespace-pre-line ">{post?.content} </p>
                    </Link>

                    {/* photo if it exist */}
                    {
                        (post.images && post.images.length > 0) && 
                            <div className='flex items-center gap-2 overflow-x-scroll'>
                                {
                                    post.images?.map((img, index) => (
                                        <img
                                            key={index} 
                                            src={`${img}`} 
                                            alt={post.title} 
                                            className='max-h-[430px] max-w-[530px] mt-4 rounded-xl border border-stone-300'
                                        />
                                    ))
                                }
                            </div>
                    }
                    
                </div>
                <div className='flex gap-1 items-center mt-2 -ml-2 text-stone-700'>
                    <Like postId={post?._id} initialLikes={post?.likes} currentUserId={session?.user?.id} />
                    <div className='flex gap-1 text-sm  justify-center items-center hover:bg-stone-100 cursor-pointer p-2 rounded-full'>
                        <MessageCircle
                            onClick={() => setShowComment(!showComment)} 
                            className='-scale-x-100'  
                            size={20} 
                        />
                        { comments?.length > 1 && <p>{comments?.length}</p>}
                    </div>
                    <div className='flex gap-1 text-sm  justify-center items-center hover:bg-stone-100 cursor-pointer p-2 rounded-full rotate-6'>
                        <Send size={19}/>
                    </div>
                </div>
            </div>
        </div>
        {
            showComment && (
                <div  className="pb-4">
                    <Comment 
                        author={post.author} 
                        postId={post._id}
                        comments={comments}
                        setComments={setComments}
                    />
                </div>
            )
        }
        {
            successMessage && <SuccessMessage message={successMessage}/>
        }
    </div>
  )
}

export default Post
