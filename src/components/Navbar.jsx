'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { useRouter } from 'next/router'
import React from 'react'

const Navbar = () => {
  const pathname = usePathname()
  return (
    
    <nav>
      {
        (pathname !== "/home" ) && (
          <div className='bg-[#fcf8eff5] flex justify-center items-center border-b border-black fixed top-0 w-full z-50'>
            Nav with search input
          </div>
        )
      }
    </nav>
  )
}

export default Navbar
