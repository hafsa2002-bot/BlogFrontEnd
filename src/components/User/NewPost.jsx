import { ChevronRight, Image, NotepadText, Plus, SendHorizonal, Smile, Sticker, UserRound, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'

function NewPost({setShowNewPost}) {
    const {data: session, status} = useSession()
    const formRef = useRef(null)
    // const isLoggedIn = session?.user

    const handleClickOutside = (event) => {
        if(formRef.current && !formRef.current.contains(event.target)){
            setShowNewPost(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
  return (
    <div  className='w-screen h-screen top-0  right-0 fixed z-50 flex justify-center items-center ' style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <form ref={formRef} className=' bg-white pb-4 border border-stone-300  lg:w-1/2 w-11/12  rounded-md  flex flex-col justify-center gap-4 overflow-hidden'>
            <div className='px-5 py-3 flex justify-between border-b border-stone-300'>
                <div
                    onClick={() => setShowNewPost(false)} 
                    className=' cursor-pointer '
                >
                    Cancel
                </div>
                <h3 className='text-xl font-bold'>New post</h3>
                <div><NotepadText size={22} /></div>
            </div>
            <div className='px-4 border-b border-stone-300 pb-3 flex flex-col gap-2.5 w-full'>
                <div className=' flex gap-2'>
                    <div className=' w-9 h-9 border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                        <UserRound fill="white" strokeWidth={0} size={40} className='relative top-2' />
                    </div>
                    <div className='w-11/12'>
                        <div className=' text-stone-500 flex items-center gap-2.5'>
                            <p className='  text-black font-semibold  '>{session?.user.email}</p>
                            <div className='flex justify-center items-center gap-1 px-1.5 py-0.5 text-sm border border-stone-300 rounded-lg'>
                                <Plus size={17} />
                                <p className=''>Add a topic</p>
                            </div>
                        </div>
                        <textarea
                            placeholder="What's new?"
                            className="w-full h-32 mt-2 resize-none rounded-md  focus:outline-none "
                        />
                        <div className='flex text-stone-600'>
                            <div className='relative group hover:bg-stone-100 px-2 py-1.5 rounded-lg cursor-pointer flex justify-center items-center' >
                                <Image size={20}/>
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
                <button className=' flex justify-center cursor-pointer items-center gap-1.5 w-fit px-2 py-1.5 rounded-xl bg-[#F27C3A] text-white '>
                    Publish <SendHorizonal size={17}/> 
                </button>
            </div>
        </form>
    </div>
  )
}

export default NewPost
