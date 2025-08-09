import React, {useState} from 'react'
import Image from "next/image"
import Unknown from '../Unknown'
import { getShortTimeAgo } from "@/utils/timeAgo"
import Link from "next/link"
import { Bookmark, Ellipsis, PenLine, Trash2 } from 'lucide-react'
import DeleteComment from './DeleteComment'
import { useSession } from "next-auth/react"
import EditComment from './EditComment'
import ProfileOverview from '../ProfileOverview'

function GetComment({comment, setComments, postId}) {
    const [showProfile, setShowProfile] = useState(false)
    const [showAbove, setShowAbove] = useState(false)
    const [deleteCommentPopUp, setDeleteCommentPopUp] = useState(null)
    const [editCommentPopUp, setEditCommentPopUp] = useState(null)
    const [showCommentOptions, setShowCommentOptions] = useState(null)
    const commentDate = new Date(comment.createdAt)
    const now = new Date()
    const twentyFourHours = 24 * 60 * 60 * 1000
    const timeDiff = now - commentDate
    const isEditable =  timeDiff < twentyFourHours
    const {data: session, status} = useSession()


    return (
    <div className="flex justify-between">
        <div className="flex justify-start  gap-3">
            <div>
                {
                    comment?.author?.profileImage
                    ? (
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-stone-300">
                            <Image 
                                src={comment?.author?.profileImage}
                                alt={comment?.author?.username}
                                width={36}
                                height={36}
                                className="object-cover w-full h-full"
                                unoptimized
                            />
                            </div>
                    ) : (
                        <Unknown width={8} height={8} size={36} top={2} />
                    )
                }
            </div>
            <div>
                <div className="flex gap-1">
                    <div
                        className='relative font-semibold hover:underline cursor-pointer'
                        onMouseEnter={(e) =>{
                            const x = e.currentTarget.getBoundingClientRect()
                            const spaceBelow = window.innerHeight - x.bottom
                            setShowAbove(spaceBelow < 200)
                            setShowProfile(true)
                        }}
                        onMouseLeave={() => setShowProfile(false)}
                    >
                        <Link  href={`/${comment?.author?._id}`} className="font-semibold hover:underline">
                            {comment?.author?.username} 
                        </Link>
                        {
                            showProfile && 
                                <ProfileOverview showAbove={showAbove} author={comment.author} />
                        }
                    </div>
                    <span className='text-stone-400'>{getShortTimeAgo(new Date(comment?.createdAt))}</span>
                </div>
                <p> {comment?.content} </p>
            </div>
        </div>
        {
            session?.user?.id === comment?.author?._id && (
                <div 
                    onClick={() => setShowCommentOptions(!showCommentOptions)} 
                    className='relative w-8 h-8 hover:bg-stone-100 rounded-full flex justify-center items-center'
                >
                    <Ellipsis size={20} className='text-stone-600'/>
                    {
                        showCommentOptions && (
                            <div className='absolute top-7 right-1 z-50 w-38 bg-white rounded-xl border border-stone-300 text-black overflow-hidden'>
                                {
                                    isEditable
                                    ? (
                                        <div 
                                            onClick={() => setEditCommentPopUp(true)} 
                                            className='border-b border-stone-300 p-1 font-medium '
                                        >
                                            <div className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'>
                                                Edit <PenLine size={21}/>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='border-b border-stone-300 p-1 font-medium '>
                                            <div className='hover:bg-stone-100 text-gray-500 p-2 rounded-lg flex items-center justify-between'>
                                                Editing disabled after 24 hours 
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    session?.user?.id === comment?.author?._id && (
                                        <div
                                            onClick={() => setDeleteCommentPopUp(true)} 
                                            className='p-1 font-medium text-red-500'
                                        >
                                            <div className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'>
                                                Delete <Trash2 size={21}/>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            )
        }
        { deleteCommentPopUp && (
            <DeleteComment 
                setDeleteCommentPopUp={setDeleteCommentPopUp} 
                userId={session?.user?.id}
                commentId={comment?._id}
                postId={postId}
                setComments={setComments}
            /> 
        )}
        { editCommentPopUp && (
            <EditComment
                setEditCommentPopUp={setEditCommentPopUp} 
                // userId={session?.user?.id}
                author={comment?.author}
                content={comment?.content}
                commentId={comment?._id}
                postId={postId}
                setComments={setComments}
            /> 
        )}
    </div>
  )
}

export default GetComment
