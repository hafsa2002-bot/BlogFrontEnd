'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

function Footer() {
  const pathname = usePathname()
  return (
    //#fcf8eff5 relative z-50
    <div className={` text-sm text-stone-500 flex justify-between items-center  py-4 px-6  border-t mt-2 bg-[#FAF7F0] w-full h-[9vh] ${pathname == "/" && 'fixed bottom-0 z-50'}`}>
      <div className='flex items-center gap-1.5 '>
          <div className='w-7'>
              <img className='w-full' src="/images/logo4.png" />
          </div>
          <div className='text-lg font-bold text-orange-500 mb-1.5'>Floren</div>
      </div>
      <ul className='flex gap-4'>
        <li className='hover:underline cursor-pointer hover:text-black'>Help</li>
        {/* <li>Status</li> */}
        <li className='hover:underline cursor-pointer hover:text-black'>About</li>
        <li className='hover:underline cursor-pointer hover:text-black'>Careers</li>
        {/* <li>Press</li> */}
        <li className='hover:underline cursor-pointer hover:text-black'>Blog</li>
        <li className='hover:underline cursor-pointer hover:text-black'>Privacy</li>
        {/* <li>Rules</li> */}
        <li className='hover:underline cursor-pointer hover:text-black'>Terms</li>
      </ul>
      <div>
        Copyright2029©Floren
      </div>
    </div>
  )
}

export default Footer
