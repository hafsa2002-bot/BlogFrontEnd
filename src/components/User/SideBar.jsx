import {AlignLeft, ArrowRight, Bookmark, Hash, Heart, House, LogOut, Plus, Search, User, User2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import NavLink from '../NavLink'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { logout } from '../../../lib/actions/auth'

function SideBar() {
    const pathname = usePathname()
    const {data: session, status} = useSession()
    const isLoggedIn = session?.user
    const [showMore, setShowMore] = useState(false)

    if(status == "loading" || pathname === "/explore-page") return null
    return (
    <div className=' w-[18%] px-3 pt-7 pb-4 border-r border-stone-300 h-screen fixed left-0 top-0 flex flex-col justify-center'>
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
        <div
            onClick={() => setShowMore(!showMore)} 
            className='relative flex gap-2.5 px-4 py-3 font-semibold rounded-lg cursor-pointer transition-colors hover:bg-[#F27C3A] hover:text-white'
        >
            <AlignLeft/> More
            {
                showMore && (
                    <div className='absolute w-38 left-20 bottom-10  border border-stone-300 shadow-lg rounded-xl bg-white text-black'>
                        <div className='p-2'>
                            <ul className='border-b border-stone-300 '>
                                {/* to english */}
                                <li className='flex justify-between items-center hover:bg-stone-200 rounded-xl p-2 cursor-pointer'>Apparence <ArrowRight size={20} /> </li>
                                <li className='hover:bg-stone-200 rounded-xl p-2 cursor-pointer'>Settings</li>
                            </ul>
                            <div
                                onClick={() => logout()} 
                                className='p-2 flex items-center gap-2 text-red-600'
                            >
                                <LogOut size={20} /> Logout
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default SideBar
