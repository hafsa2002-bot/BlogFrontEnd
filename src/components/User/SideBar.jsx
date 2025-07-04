import {AlignLeft, Bookmark, Hash, Heart, House, Plus, Search, User, User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import NavLink from '../NavLink'

function SideBar() {
  return (
    <div className=' w-[18%] px-3 pt-7 pb-4 h-screen fixed left-0 top-0 flex flex-col justify-center'>
        <div>
            <Link href="/" className='cursor-pointer flex items-center gap-1.5 px-4'>
                <div className='w-8'>
                    <img className='w-full' src="/images/logo4.png" />
                </div>
                <div className='text-2xl font-bold text-black mb-1.5'>Floren</div>
            </Link>
        </div>
        <ul className='flex flex-col h-full justify-center gap-3 px-1 '>
            <li>
                <NavLink href="/"><House /> Home</NavLink>
            </li>
            <li>
                <NavLink href="/login"><Search/> Search</NavLink>
            </li>
            <li>
                <NavLink href="/login"><Hash/> Trends</NavLink>
            </li>
            <li>
                <NavLink href="/login"><Heart/> Notifications</NavLink>
            </li>
            <li >
                <NavLink href="/login"><div className='border-2 rounded-lg flex justify-center items-center w-6 h-6'><Plus /></div> Create</NavLink>
            </li>
            <li >
                <NavLink href="/login"><Bookmark/> Saved</NavLink>
            </li>
            <li>
                <NavLink href="/profile"><div><User2/></div> Profile</NavLink>
            </li>
        </ul>
        <div className='flex gap-2.5 px-4 py-3 font-semibold rounded-lg cursor-pointer transition-colors hover:bg-[#F27C3A] hover:text-white'>
            <AlignLeft/> More
        </div>
    </div>
  )
}

export default SideBar
