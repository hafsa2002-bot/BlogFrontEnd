'use client'
import { User2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"

export default function CompleteProfilePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('user')
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [file, setFile] = useState(null);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        if (searchParams) {
            const id = searchParams.get("user");
            if (id) {
            axios.get(`/api/users/${id}`)
                .then((res) => {
                    setUserInfo(res.data);
                    console.log("Fetched user:", res.data);
                    console.log(typeof res.data)
                })
                .catch((err) => console.error(err));
            }
        }
    }, [searchParams])

    const handleCompleteProfile = async (e) => {
        e.preventDefault();
        if(!username){
            setError("username is required")
            return
        }
        setLoading(true)
        const formData = new FormData();
        formData.append("userId", id)
        formData.append("username", username)
        formData.append("bio", bio)
        if(file) formData.append("profileImage", file)

        try{
            const res = await axios.post("/api/complete-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log("Updated user:", res.data.user)
            router.push("/profile")
        }catch(error){
            if(error.response){
                setError(error.response.data.error || "Something went wrong")
            }else{
                setError("Network error. Please try again.")
            }
        }finally{
            setLoading(false)
        }
    }
    

  return (
    <div className="bg-[#F27C3A]/30 w-full h-screen flex justify-center items-center ">
        <div className="bg-white shadow-xl w-6/12 rounded-2xl border border-stone-400 px-10 py-7">
            <h2 className="text-3xl font-extrabold mb-1">Build your profile</h2>
            <p className="text-lg w-11/12 ">Tell us a little about yourself - This is how others will see you. You&apos;ll always be able to edit this later in your Settings.</p>

            {error && 
                <div className="fixed top-2 right-1/2 translate-x-1/2 w-fit font-semibold z-50 bg-red-500 text-white  text-sm py-1.5 px-3 rounded-md mt-2 flex justify-center items-center gap-1 transition-opacity duration-300">
                    {error}
                </div> 
            }

            <form onSubmit={handleCompleteProfile} className="mt-5 flex flex-col justify-center gap-3 w-full">
                <div className="flex gap-5">
                    <div className="bg-stone-200 w-16 h-16 flex justify-center items-center rounded-full overflow-hidden border border-stone-400">
                        <User2 size={60} strokeWidth={0} fill="gray" className="relative top-3" />
                    </div>
                    <div>
                        <div className="text-lg text-black pb-1">{userInfo?.email}</div>
                        <div className="bg-[#F27C3A] flex justify-center items-center  rounded-lg p-0.5">
                            <label htmlFor="profileImage" className="bg-[#F27C3A] cursor-pointer text-white rounded-lg p-1.5 border-2 border-white  font-semibold  text-sm ">Edit profile image</label>
                        </div>
                        <input 
                            id="profileImage" 
                            name="profileImage" 
                            type="file" 
                            className="hidden py-1.5" 
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold" htmlFor="username">Username</label>
                    <input 
                        className="border border-stone-400 rounded-xl px-2.5 py-2"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold" htmlFor="bio">Bio</label>
                    <textarea 
                        className="border border-stone-400 rounded-xl px-2.5 py-2"
                        id="bio"
                        name="bio"
                        placeholder="Tell us a little about yourself"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                    ></textarea>
                </div>
                <div className="flex justify-end w-full">
                    <button type="submit" disabled={loading} className="bg-[#F27C3A] disabled:opacity-50 text-white px-5 py-2 rounded-xl font-semibold text-[15px] mt-3 cursor-pointer">
                        {loading ? "Saving..." : "Continue"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
