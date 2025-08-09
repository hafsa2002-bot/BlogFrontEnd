import { Check, ChevronRight, ImagePlus, Loader, NotepadText, Plus, SendHorizonal, Smile, Sticker, UserRound, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ErrorMessage from '../ErrorMessage'

function NewPost({setShowNewPost, posts, setPosts, author}) {
    const {data: session, status} = useSession()
    const formRef = useRef(null)
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false)
    const [selectedImages, setSelectedImages] = useState([]);
    const router = useRouter();
    // const isLoggedIn = session?.user

    const handleImageChange = (e) => {
        // setSelectedImages(Array.from(e.target.files)); // multiple files
        const files = Array.from(e.target.files);

        setSelectedImages(prev => {
            const totalImages = prev.length + files.length;

            if (totalImages > 5) {
                setError("You can upload up to 5 images only.");
                setTimeout(() => {
                    setError("")
                }, 2000);
                return [...prev, ...files].slice(0, 5); // keep only first 5
            }

            return [...prev, ...files];
        });
    };
    
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("");

        if(!content.trim()) return

        setLoading(true)
        try{
            const formData = new FormData();
            formData.append("content", content);

            selectedImages.forEach((imageFile) => {
                formData.append("images", imageFile);
            });

            // const res = await axios.post("/api/posts",  {
            //     content,
            // })
            const res = await axios.post("/api/posts", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            })
            /*
            setSuccess("Post created!")
            setContent("")
            setSelectedImages([]);
            console.log("new post created: ", res.data.post)
            router.reload()
            setTimeout(() => setSuccess(""), 1000)
            setTimeout(() => setShowNewPost(false), 1500)
            */
            if (res.status === 200 && res.data?.post) {
                setSuccess("Post created!");
                setTimeout(() => setSuccess(""), 1000)
                setError(""); // make sure error message disappears
                setContent("");
                setSelectedImages([]);
                console.log("new post created:", res.data.post);

                // Reload after short delay so user sees success
                setTimeout(() => {
                    // router.reload();
                    // router.refresh()
                    window.location.reload()
                }, 800);
            } else {
                throw new Error(res.data?.message || "Failed to create post");
            }
        }catch(error){
            setError(error.response?.data.message || "Failed to create post")
        }finally{
            setLoading(false)
        }
    }
  return (
    <div  className='w-screen h-screen top-0  right-0 fixed z-50 flex justify-center items-center ' style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className=' bg-white pb-4 border border-stone-300  lg:w-1/2 w-11/12  rounded-md  flex flex-col justify-center gap-4 overflow-hidden'
        >
            <div className='relative px-5 py-3 flex justify-between border-b border-stone-300'>
                <div
                    onClick={() => setShowNewPost(false)} 
                    className=' cursor-pointer '
                >
                    Cancel
                </div>
                <h3 className='text-xl font-bold'>New post</h3>
                <div><NotepadText size={22} /></div>
                
                {error && 
                    // <div className="text-red-500">{error}</div>
                    <ErrorMessage message = {error}/>
                }
                {success && 
                    <div className="flex gap-1 absolute top-1 right-1 shadow-xl bg-white rounded-xl p-2 border border-stone-300 items-center text-sm font-semibold">
                        {success} 
                        <div className='w-5 h-5 rounded-full bg-green-700 text-white flex justify-center items-center'> 
                            <Check size={15} strokeWidth={2} /></div> 
                        </div>
                }
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
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's new?"
                            className="w-full h-32 mt-2 resize-none rounded-md  focus:outline-none "
                            required
                            disabled={loading}
                        />
                        <div className='flex text-stone-600'>
                            {/* <div className='relative group hover:bg-stone-100 px-2 py-1.5 rounded-lg cursor-pointer flex justify-center items-center' >
                                <ImagePlus size={20}/>
                                <div className='absolute top-8 left-6 hidden group-hover:block bg-white border border-black text-black px-2 py-1 text-sm whitespace-nowrap'>
                                    Add a media
                                </div>
                            </div> */}
                            <label
                                htmlFor='images' 
                                className='relative group hover:bg-stone-100 px-2 py-1.5 rounded-lg cursor-pointer flex justify-center items-center' 
                            >
                                <ImagePlus size={20}/>
                                <div className='absolute z-40 top-8 left-6 hidden group-hover:block bg-white border border-black text-black px-2 py-1 text-sm whitespace-nowrap'>
                                    Add a media
                                </div>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden mt-2"
                                name="images"
                                id="images"
                                disabled={selectedImages.length >= 5}
                            />
                            <div className='relative group hover:bg-stone-100 px-2 py-1.5 rounded-lg cursor-pointer flex justify-center items-center'>
                                <Smile size={20} />
                                <div className='absolute z-40 top-8 left-6 hidden group-hover:block bg-white border border-black text-black px-2 py-1 text-sm whitespace-nowrap'>
                                    Add an emoji
                                </div>
                            </div>
                        </div>
                        {
                            selectedImages.length > 0 && (

                                <div className="flex gap-2 flex-wrap mt-4">
                                    {selectedImages.map((image, i) => (
                                        <div key={i} className="relative">
                                            <img
                                            src={URL.createObjectURL(image)}
                                            alt="preview"
                                            className="w-14 h-14 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                setSelectedImages(prev => prev.filter((_, index) => index !== i));
                                                }}
                                                className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500"
                                            >
                                                <X size={13}/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
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
                                Publish <SendHorizonal size={17}/> 
                            </div>
                        )
                    }
                </button>
            </div>
        </form>
    </div>
  )
}

export default NewPost
