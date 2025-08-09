import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import axios from 'axios'
import {ImagePlus, Loader, NotepadText, Plus, SendHorizonal, Smile, UserRound } from 'lucide-react'

function EditComment({postId, commentId, content, setEditCommentPopUp, author}) {
    const formRef = useRef(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [newContent, setNewContent] = useState(content)

    const handleClickOutside = (event) => {
        if(formRef.current && !formRef.current.contains(event.target)){
            setEditCommentPopUp(false)
        }
    }
        
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleEditComment = async() => {
        setSuccess("")
        setError("")
        setLoading(true)
        if(newContent === "" || newContent === " "){
            setError()
            setTimeout(() => {
                setError("")
            }, 1200);
            return 
        }

        try{
            const formData = new FormData()
            formData.append("content", newContent)
            formData.append("commentId", commentId)
            const res = await axios.patch(`/api/post/${postId}/comment`, formData)
            setSuccess("Post updated")
            setTimeout(() => setSuccess(""), 1200)
            console.log("Post updated: ", res.data)
        }catch(error){
            console.log("Error: ", error)
            setError(error.response?.data || "An error occurred");
            setTimeout(() => setError(""), 1200)
        }finally{
            setLoading(false)
        }

    }

    return (
        <div  className='w-screen h-screen top-0  right-0 fixed z-50 flex justify-center items-center ' style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <form 
            ref={formRef}
            onSubmit={handleEditComment} 
            className=' bg-white pb-4 border border-stone-300  lg:w-1/2 w-11/12  rounded-md  flex flex-col justify-center gap-4 overflow-hidden'
        >
            <div className='relative px-5 py-3 flex justify-between border-b border-stone-300'>
                <div
                    onClick={() => setEditCommentPopUp(false)} 
                    className=' cursor-pointer '
                >
                    Cancel
                </div>
                <h3 className='text-xl font-bold'>
                    Edit comment 
                </h3>
                <div><NotepadText size={22} /></div>
                
                {error && <p className="text-red-500">{error}</p>}
                {success && <div className="flex gap-1 absolute top-1 right-1 shadow-xl bg-white rounded-xl p-2 border border-stone-300 items-center text-sm font-semibold">{success} <div className='w-5 h-5 rounded-full bg-green-700 text-white flex justify-center items-center'> <Check size={15} strokeWidth={2} /></div> </div>}
            </div>
            <div className='px-4 border-b border-stone-300 pb-3 flex flex-col gap-2.5 w-full'>
                <div className=' flex gap-2 items-start'>
                    <div className='' >
                        {
                            author?.profileImage
                            ? (
                                <div className='w-full h-full border border-stone-300 rounded-full  flex justify-center items-center overflow-hidden cursor-pointer ' >
                                    <Image src={`${author?.profileImage}`} width={36} height={36} alt='profile image' className='object-cover' unoptimized />
                                </div>
                            ) : (
                                <div className=' w-full h-full border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                                    <UserRound fill="white" strokeWidth={0} size={40} className='relative top-2' />
                                </div>
                                // <UserRound fill="white" strokeWidth={0} size={40} className='relative top-2' />
                            )
                        }
                    </div>
                    <div className='w-11/12'>
                        <div className=' text-stone-500 flex items-center gap-2.5'>
                            <p className='  text-black font-semibold  '>{author?.username}</p>
                            <div className='flex justify-center items-center gap-1 px-1.5 py-0.5 text-sm border border-stone-300 rounded-lg'>
                                <Plus size={17} />
                                <p className=''>Add a topic</p>
                            </div>
                        </div>
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="What's new?"
                            className="w-full h-32 mt-2 resize-none rounded-md  focus:outline-none "
                            required
                            disabled={loading}
                        />
                        <div className='flex text-stone-600'>
                            <div className='relative group hover:bg-stone-100 px-2 py-1.5 rounded-lg cursor-pointer flex justify-center items-center' >
                                <ImagePlus size={20}/>
                                <div className='absolute top-8 left-6 hidden group-hover:block bg-white border border-black text-black px-2 py-1 text-sm whitespace-nowrap'>
                                    Add a media
                                </div>
                            </div>
                            <div className='relative group hover:bg-stone-100 px-2 py-1.5 rounded-lg cursor-pointer flex justify-center items-center'>
                                <Smile size={20} />
                                <div className='absolute top-8 left-6 hidden group-hover:block bg-white border border-black text-black px-2 py-1 text-sm whitespace-nowrap'>
                                    Add an emoji
                                </div>
                            </div>
                        </div>
                        {/* <input className='outline-none mb-10 pb-10 border flex justify-start' placeholder="What's new?" /> */}
                    </div>
                </div>

            </div>
            <div className='px-4 flex justify-end gap-2'>
                <div className=' border border-[#F27C3A] text-[#F27C3A] cursor-pointer w-fit px-2 py-1.5 rounded-xl '>
                    Save draft
                </div>
                <button disabled={loading} type="submit" className=' flex justify-center cursor-pointer items-center gap-1.5 w-fit px-2 py-1.5 rounded-xl bg-[#F27C3A] text-white '>
                    {
                        loading 
                        ? (
                            <Loader size={18} className="animate-spin"/>
                        ) : (
                            <div className='flex justify-center items-center gap-1.5'>
                                Save changes <SendHorizonal size={17}/> 
                            </div>
                        )
                    }
                </button>
            </div>
        </form>
    </div>
    )
}

export default EditComment
