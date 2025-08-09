import { Bookmark, Loader } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { getCurrentUser } from '@/utils/getCurrentUser'

function SavePost({postId, setSuccessMessage, isSaved, setIsSaved}) {
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        if (loading) return;
        try{
            setLoading(true)
            const res = await axios.post(`/api/post/${postId}/save`)
            // const isNowSaved = res.data.message.includes("saved");
            setIsSaved(prev => !prev);
            console.log(res.data.message)
            setSuccessMessage(res.data.message)
            setTimeout(() => setSuccessMessage(""), 2200)
        }catch(err){
            console.log("Error saving post ", err)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div>
        <div 
            onClick={handleSave}
            disabled={loading} 
            className='hover:bg-stone-100 p-2 rounded-lg flex items-center justify-between'
        >
            {
                loading
                ? (
                    <div className='w-full flex justify-center items-center'><Loader size={18} className="animate-spin"/></div>
                ) : isSaved ? (
                    <>Unsave <Bookmark fill="black" size={21} /></>
                ) : (
                    <>Save <Bookmark size={21} /></>
                )
            }
        </div>
    </div>
  )
}

export default SavePost
