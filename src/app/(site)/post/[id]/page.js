'use client'

import { useParams } from "next/navigation"

export default function PostPage() {
    const params = useParams()
    const id = params.id
  return (
    <div className="bg-white px-7 pt-5 mb-10 rounded-2xl w-10/12">
        post id: {id}
    </div>
  )
}
