'use client'
import MiniSpinner from "@/components/MiniSpinner"
import Post from "@/components/User/Post"
import axios from "axios"
import { ArrowLeft } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function SavedPage() {
  const [savedPosts, setSavedPosts] = useState([])
  const {data: session, status} = useSession()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchPosts = useCallback(() => {
    if (!session?.user?.id) return
    setLoading(true)
    axios.get(`/api/users/${session?.user?.id}/savedPosts`)
      .then(res => setSavedPosts(res.data.savedPosts))
      .catch(err => console.log("Error: ", err))
      .finally(() => setLoading(false))
  }, [session?.user?.id])
    

  useEffect(() => {
    if(session.user){
      fetchPosts()
    }
  }, [fetchPosts, session?.user])
  return (
    <>
      <div className="flex justify-between items-center w-10/12 pb-3">
        <div 
          onClick={() => router.back()} 
          className="w-7 h-7 bg-white border border-stone-300 rounded-full flex justify-center items-center"
        >
          <ArrowLeft size={17} />
        </div>
        <h3 className="font-semibold">Saved Posts</h3>
        <div></div>
      </div>
      <div  className="bg-white  pt-5 mb-10 rounded-2xl w-10/12">
        {
          loading
          ? (
            <div className="w-full h-[80vh] flex justify-center items-center">
              <MiniSpinner/>
            </div>
          ) : savedPosts.length === 0 ? (
            <div className=" w-full h-[80vh] flex flex-col gap-2 justify-center items-center">
                <Image src="/images/NotFound.png" width={160} height={160} alt="not found image"/>
                <p className="text-3xl text-stone-400 font-semibold">No saved posts.</p>
            </div>
          ) : (
            savedPosts.map((post, index) => (
              <div key={index} className={`px-5 ${ index !== savedPosts.length-1 && 'border-b border-stone-300'}`}>
                <Post post={post} onPostDeleted={fetchPosts} />
              </div>
            ))
          )
        }
      </div>
    </>
  )
}
