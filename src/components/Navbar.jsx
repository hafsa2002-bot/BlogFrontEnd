'use client'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { useRouter } from 'next/router'
import React from 'react'

const Navbar = () => {
  const pathname = usePathname()
  return (
    
    <div>
      {
        (pathname !== "/" &&  pathname !== "/login" && pathname !== "/register"  ) && (
          <nav className='bg-[#FAF7F0] py-5 flex justify-center w-full items-center fixed top-0 z-50 border-b border-stone-300 shadow-xl'>
            <div className=' flex justify-between w-11/12 '>
              <div className='flex gap-8'>
                <Link href="/" className='cursor-pointer flex items-center gap-1.5 '>
                    <div className='w-10'>
                        <img className='w-full' src="/images/logo4.png" />
                    </div>
                    <div className='text-3xl font-bold text-black mb-1.5'>Floren</div>
                </Link>
                <div className='rounded-full w-72 bg-white  border-stone-200 border flex items-center gap-1.5 px-2.5 py-1'>
                  <Search className='text-stone-600' size={20} />
                  <input 
                    type="search" 
                    placeholder='Search...' 
                    className=' w-10/12  placeholder:text-stone-600' 
                  />
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Link href="/login" className='text-[#ec8b4a] cursor-pointer hover:bg-[#F27C3A] hover:text-white px-2.5 py-1.5 rounded-full font-semibold text-sm ml-7'>Log in</Link>
                <Link href="/register" className='cursor-pointer bg-[#F27C3A] px-4 py-1.5 rounded-full font-semibold text-sm text-white'>Create account</Link>
              </div>
            </div>
          </nav>
        )
      }
    </div>
  )
}

export default Navbar
