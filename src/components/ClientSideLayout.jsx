'use client'
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { usePathname } from 'next/navigation'

function ClientSideLayout({children}) {
    const pathname = usePathname()
  return (
    <div  className={`bg-[#FAF7F0] ${ (  pathname !== "/login" && pathname !== "/register"  ) ? 'pt-28' : ''}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
    </div>
  )
}

export default ClientSideLayout
