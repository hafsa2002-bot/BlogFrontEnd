import { ArrowUp, Loader, MessageCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Unknown from '../Unknown'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from 'next-auth/react'

function Comment({author, postId, comments, setComments}) {
  const [comment, setComment] = useState("")
  const [userInfo, setUserInfo] = useState({}) 
  const [loading, setLoading] = useState(true)
  const [commentLoading, setCommentLoading] = useState(false)
  const {data: session, status} = useSession()

  const fetchUserInfo = async () => {
    axios.get(`/api/users/${session?.user?.id}`)
      .then(response => setUserInfo(response.data))
      .catch(err => console.log("Error: ", err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!comment.trim()) return
    setCommentLoading(true)
    try{
      const res = await axios.post(`/api/post/${postId}/comment`, {
        content: comment
      })
      setComments([...comments, {
        ...res.data,
        author: {
          username: userInfo?.username,
          profileImage: userInfo?.profileImage
        }
      }])
      setComment("")
      console.log("comment added : ", res.data)
    }catch(error){
      console.log("Failed to post comment: ", error)
    }finally{
      setCommentLoading(false)
    }

  }
  
  if(!session) return <p>loading...</p>
  return (
    <>
      {
        !loading && (
          <div className='flex gap-3 items-center' >
            <div className=''>
              {
                userInfo?.profileImage 
                ? (
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-stone-300">
                    <Image 
                      src={userInfo?.profileImage}
                      alt={userInfo?.username}
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
            <form onSubmit={handleSubmit} className="w-11/12 flex justify-between items-end">
              <div className='w-10/12'>
                <h3 className='font-semibold'>{userInfo?.username}</h3>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder ={`Say something to ${author.username}`}
                  className=' w-full placeholder:text-sm outline-none'
                  disabled={commentLoading}
                />
              </div>
              {
                comment !== "" && 
                  (<button disabled={commentLoading} className='w-7 h-7 cursor-pointer rounded-full bg-[#F27C3A] text-white flex justify-center items-center' >
                    {
                      commentLoading 
                      ? (
                        <Loader size={18} className="animate-spin"/>
                      ): (
                        <ArrowUp size={18} />
                      )
                    }
                  </button>)
              }
            </form>
          </div>
        )
      }
    </>
  )
}

export default Comment
