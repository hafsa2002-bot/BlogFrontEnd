'use client'
import ConfirmPasswordInput from "@/components/ConfirmPasswordInput"
import EmailInput from "@/components/EmailInput"
import PasswordInput from "@/components/PasswordInput"
import { X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import ErrorMessage from "@/components/ErrorMessage"
import SuccessMessage from "@/components/SuccessMessage"

export default function Register() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [psswrdConfirmation, setPsswrdConfirmation] = useState('')
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // check if the password == password confirmation
    if(password !== psswrdConfirmation){
      setError("Passwords do not match")
      setTimeout(() => setError(""), 2000)
      return;
    }

    if( !email || !password || !psswrdConfirmation){
      setError("All fields are necessary.")
      setTimeout(() => setError(""), 2000)
      return;
    }

    try{
      setLoading(true)
      const res = await axios.post("/api/register", {
        email,
        password,
      })
      setSuccess("Account created successfully!")
      // setTimeout(() => setSuccess(""), 2000)
      setEmail("")
      setPassword("")
      setPsswrdConfirmation("")

      setSuccess("Account created successfully!");

      // Wait a bit before redirecting
      setTimeout(() => {
        setSuccess(""); // Optional: clear it
        router.push("/login");
      }, 3000);

    } catch(error){
      setLoading(false)
      // if error = 400 : user (email) already exists
      if(error.response && error.response.status === 400){
        setError(error.response.data.error)
        setTimeout(() => setError(""), 2000)
      }else{
        setError("Something went wrong. Please try again.: ", error)
        setTimeout(() => setError(""), 2000)
        console.log("Error: ", error)
      }
    }
  }
  return (
      <div className="flex">
        <div className="w-1/2 h-screen flex flex-col items-center justify-center  ">
            <Link href="/" className='cursor-pointer flex items-center gap-1.5 w-7/12 text-start relative bottom-16 mb-3'>
                <div className='w-10'>
                    <img className='w-full' src="/images/logo4.png" />
                </div>
                <div className='text-3xl font-bold text-[#F27C3A] mb-1.5'>Floren</div>
            </Link>
            <div className="w-7/12 text-start">
              <h2 className="text-4xl font-bold font-serif mb-1">Join Us Today!</h2>
              <p className="text-sm text-stone-600">Fill in the details below to create your account</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-7 w-7/12 flex flex-col">
              <EmailInput email={email} setEmail={setEmail} />
              <PasswordInput password={password} setPassword={setPassword} />
              <ConfirmPasswordInput psswrdConfirmation={psswrdConfirmation} setPsswrdConfirmation={setPsswrdConfirmation} />
              <button 
                disabled={loading}
                className={`bg-[#F27C3A] rounded-xl py-3 text-lg font-semibold text-white mt-5 transition-opacity duration-300 
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            {/* error message */}
            { error && <ErrorMessage message={error} /> }
            { success && <SuccessMessage message={success} />}

        <p className="text-stone-600 mt-6">
          Already have an account? <Link href="/login" className="text-black font-semibold hover:underline">Log In</Link>
        </p>        
      </div>
        <div className="w-1/2 p-3">
            <div className="bg-white rounded-tr-xl rounded-br-xl rounded-tl-lg rounded-bl-[80px] h-full flex flex-col justify-center items-center">
                <img className="w-1/2 rotate-12" src="/images/09d24e63-a074-42b3-82ab-5d684666aae4.png"  />
                <h1 className="font-semibold text-3xl mt-2">Your Creative Corner Awaits</h1>
                <p className="text-stone-600 text-lg mt-4  w-1/2 text-center">Start writing, exploring, and connecting through your words.</p>
            </div>
        </div>
    </div>
  )
}
