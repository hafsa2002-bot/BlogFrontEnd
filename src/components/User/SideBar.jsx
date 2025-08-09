import {AlignLeft, ArrowRight, Bookmark, Hash, Heart, House, LogOut, Plus, Search, User, User2, UserRound } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import NavLink from '../NavLink'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { logout } from '../../../lib/actions/auth'
import Image from 'next/image'
import axios from 'axios'
import SearchBar from './SearchBar'

function SideBar() {
    const pathname = usePathname()
    const {data: session, status} = useSession()
    const isLoggedIn = session?.user
    const [showMore, setShowMore] = useState(false)
    const [isSideBclosed, setIsSideBClosed] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const fetchUserInfo = () => {
            axios.get(`/api/users/${session?.user?.id}`)
            .then(response => setUserInfo(response.data))
            .catch(err => console.log("Error: ", err))
        }
        fetchUserInfo()
    }, [])

    if(status == "loading" || pathname === "/explore-page") return null
    return (
    <div className={`px-3 pt-7 pb-4 border-r border-stone-300 h-screen fixed z-50 left-0 top-0 flex flex-col justify-center
        ${isSideBclosed 
            ? 'w-20 items-center'
            : 'w-[18%]'
        }
        `}
    >
        <div>
            {
                isSideBclosed
                ? (
                    <Link href="/">
                        <div className='w-8'>
                            <img className='w-full' src="/images/logo4.png" />
                        </div>
                    </Link>
                ) : (
                    <Link href="/" className='cursor-pointer flex items-center gap-1.5 px-4'>
                        <div className='w-8'>
                            <img className='w-full' src="/images/logo4.png" />
                        </div>
                        <div className='text-2xl font-bold text-black mb-1.5'>Floren</div>
                    </Link>
                )
            }
        </div>
        <ul className='flex flex-col h-full justify-center gap-3 px-1 '>
            <li>
                <NavLink href="/">
                    <House /> {!isSideBclosed && <h3>Home</h3>} 
                </NavLink>
            </li>
            <li>
                {/* <NavLink href="/"><Search/> Search</NavLink> */}
                <div 
                    className={`flex gap-2.5 px-4 py-3 font-semibold rounded-lg cursor-pointer transition-colors
                        ${isSearchActive
                            ? 'bg-[#F27C3A]/10 text-[#F27C3A]'
                            : 'text-stone-700 hover:bg-[#F27C3A] hover:text-white'}
                    `}
                    onClick={() => {
                        setIsSideBClosed(!isSideBclosed)
                        setIsSearchActive(!isSearchActive)
                    }}
                >
                    <Search/> {!isSideBclosed && <h3>Search</h3>} 
                </div>
            </li>
            <li>
                <NavLink href="/profile">
                    <Hash/> {!isSideBclosed && <h3>Trends</h3>}
                </NavLink>
            </li>
            <li>
                <NavLink href="/profile">
                    <Heart/> {!isSideBclosed && <h3>Notifications</h3>} 
                </NavLink>
            </li>
            <li >
                <NavLink href="/profile">
                    <div className='border-2 rounded-lg flex justify-center items-center w-6 h-6'><Plus /></div> {!isSideBclosed && <h3>Create</h3>} 
                </NavLink>
            </li>
            <li >
                <NavLink href="/saved">
                    <Bookmark/> {!isSideBclosed && <h3>Saved</h3>}
                </NavLink>
            </li>
            <li>
                <NavLink href={`/${session?.user?.id}`}>
                    {/* <div><User2/></div> */}
                    {
                        userInfo?.profileImage
                        ? (
                            <div className='w-7 h-7 border border-stone-300 rounded-full  flex justify-center items-center overflow-hidden cursor-pointer ' >
                                <Image src={`${userInfo?.profileImage}`} width={32} height={32} alt='profile image' className='object-cover' unoptimized />
                            </div>
                        ):(
                            <div className=' w-7 h-7 border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                                <UserRound fill="white" strokeWidth={0}  className='relative top-1' />
                            </div>
                        )
                    }
                    {!isSideBclosed && <h3>Profile</h3>} 
                </NavLink>
            </li>
        </ul>
        <div
            onClick={() => setShowMore(!showMore)} 
            className='relative flex gap-2.5 px-4 py-3 font-semibold rounded-lg cursor-pointer transition-colors hover:bg-[#F27C3A] hover:text-white'
        >
            <AlignLeft/> {!isSideBclosed && <h3>More</h3>} 
            {
                showMore && (
                    <div className={` rounded-xl bg-white text-black absolute w-38  border border-stone-300 shadow-lg bottom-10 ${!isSideBclosed ? ' left-20' : 'left-8'}`}>
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
        {
            isSearchActive && (
                <SearchBar setIsSearchActive={setIsSearchActive} setIsSideBClosed={setIsSideBClosed} />
            )
        }
    </div>
  )
}

export default SideBar
