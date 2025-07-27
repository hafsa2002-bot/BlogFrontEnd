import { Heart } from 'lucide-react'
import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import LikesListPopup from './LikesListPopup'

function Like({postId, initialLikes = [], currentUserId}) {
    const [showLikedUsers, setShowLikedUsers] = useState(false)
    const [likes, setLikes] = useState(initialLikes)
    const [liked, setLiked] = useState(initialLikes.includes(currentUserId))

    const handleLike = async () => {
        try{
            const res = await axios.patch(`/api/post/${postId}/like`)
            const data = res.data
            setLikes(data.likes)
            setLiked(data.liked)
        }catch(error){
            console.log("Failed to like/unlike post: ", error.response?.data || error.message)
        }
    }
    return (
        <div
        className='flex gap-1 text-sm justify-center items-center hover:bg-stone-100 p-2 rounded-full'
        >
            <Heart 
                onClick={handleLike}
                size={20} 
                fill={`${liked ? 'red' : 'white'}`}
                strokeWidth={`${liked ? 0 : 1.5}`} 
                className='cursor-pointer transition duration-150 ease-in-out hover:scale-105'  
            />
            {/* {
                likes?.length === 1 ? <p>{likes?.length} like</p>
                : likes?.length > 1 ? <p>{likes?.length} likes</p>
                : null
            } */}
            <div 
                className={`hover:underline cursor-pointer ${liked && 'text-red-500'}`}
                onClick={() => setShowLikedUsers(true)}
            >
                {likes.length === 1 && <p>{likes.length} like</p>}
                {likes.length > 1 && <p>{likes.length} likes</p>}

            </div>
            {
                showLikedUsers && <LikesListPopup postId={postId} setShowLikedUsers={setShowLikedUsers} />
            }
        </div>
    )
}

export default Like
