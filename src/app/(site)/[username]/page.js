'use client'
import { useParams } from "next/navigation"

export default function ProfilePage() {
    const params = useParams()
  return (
    <div>
        hello, {params.username}
    </div>
  )
}
