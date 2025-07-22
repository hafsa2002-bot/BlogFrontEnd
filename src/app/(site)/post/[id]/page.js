'use client'

import Loader from "@/components/Loader"
import MiniSpinner from "@/components/MiniSpinner"
import Post from "@/components/User/Post"
import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PostPage() {
    const params = useParams()
    const id = params.id
    const [post, setPost] = useState("")
    const [loading, setLoading] = useState(true)

    const fetchPostInfo = () => {
        setLoading(true)
        axios.get(`/api/post/${id}`)
            .then(res => setPost(res.data[0]))
            .catch(error => console.log("Error: ", error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if(id){
            fetchPostInfo()
        }
    }, [id])

  return (
    <div className="bg-white px-7 pt-5 mb-10 rounded-2xl w-10/12">
        {
            loading
            ? (
                <div className="h-[80vh] w-full flex justify-center items-center">
                    <MiniSpinner/>
                </div>
            ): post ?(
                <div className="">
                    <Post post={post} />
                </div>
            ) : (
                <div className="h-[80vh] w-full flex flex-col gap-2 justify-center items-center">
                    <Image src="/images/NotFound.png" width={160} height={160} alt="not found image"/>
                    <p className="text-3xl text-stone-400 font-semibold">Post Not found.</p>
                </div>
            )
        }
    </div>
  )
}
