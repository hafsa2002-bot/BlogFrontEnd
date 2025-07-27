'use client'

import Loader from "@/components/Loader"
import MiniSpinner from "@/components/MiniSpinner"
import Unknown from "@/components/Unknown"
import Comment from "@/components/User/Comment"
import Post from "@/components/User/Post"
import PostById from "@/components/User/PostById"
import { getShortTimeAgo } from "@/utils/timeAgo"
import axios from "axios"
import { MessageCircle, MessagesSquare } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PostPage() {
    const params = useParams()
    const id = params.id
    const [post, setPost] = useState("")
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchComments = (postId) => {
        axios.get(`/api/post/${postId}/comment`)
            .then(res => {
                setComments(res.data)
                console.log(`comments in this post ${postId} : ${res.data} ` )
                console.log(typeof res.data)
            })
            .catch(error => console.log("Error: ", error))
    }

    useEffect(() => {
        const fetchPostInfo = () => {
            setLoading(true)
            axios.get(`/api/post/${id}`)
                .then(res => setPost(res.data[0]))
                .catch(error => console.log("Error: ", error))
                .finally(() => setLoading(false))
        }

        if(id){
            fetchPostInfo()
            fetchComments(id)
        }
    }, [id])

  return (
    <div className="bg-white pt-4 mb-10 rounded-2xl w-10/12 border border-stone-300">
        {
            loading
            ? (
                <div className="w-full h-[80vh] flex justify-center items-center">
                    <MiniSpinner/>
                </div>
            ): post ? (
                <div className="h-full">
                    <PostById post={post} comments={comments} setComments={setComments} />
                    <div>
                        {
                            comments?.length === 0
                            ?(
                                <div className="flex flex-col items-center justify-center gap-2 text-stone-500 text-sm mt-2 h-72 w-full">
                                    <MessagesSquare size={40} />
                                    <span className="text-lg font-semibold ">No comments yet</span>
                                </div>
                            ): (
                                <div>
                                    {
                                        comments?.map((comment, index) => (
                                            <div key={index} className={`flex justify-start  gap-3 px-4 py-2 ${index !== comments.length-1 && 'border-b border-stone-300'} `} >
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
                                                        <h3 className="font-semibold">{comment?.author?.username} </h3>
                                                        <span className='text-stone-400'>{getShortTimeAgo(new Date(comment?.createdAt))}</span>
                                                    </div>
                                                    <p> {comment?.content} </p>
                                                </div>
                                                
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : (
                <div className=" w-full h-[80vh] flex flex-col gap-2 justify-center items-center">
                    <Image src="/images/NotFound.png" width={160} height={160} alt="not found image"/>
                    <p className="text-3xl text-stone-400 font-semibold">Post Not found.</p>
                </div>
            )
        }
    </div>
  )
}
