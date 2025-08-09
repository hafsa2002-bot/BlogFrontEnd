import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Image from 'next/image'
import { UserRound, X } from 'lucide-react'
import Link from 'next/link'

function SearchBar({setIsSearchActive, setIsSideBClosed}) {
    const [users, setUsers] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try{
                const res = await axios.get('/api/users')
                setUsers(res.data)
            }catch(err){
                console.log("Error: ", err)
            }finally{
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    useEffect(() => {
        if (searchInput.trim() === "") {
            setSearchResult([]);
            return;
        }
        const result = users.filter(user => user?.username?.toLowerCase().includes(searchInput.toLowerCase()))
        setSearchResult(result)
    }, [searchInput]) 

    return (
        <div className='w-96 py-4 absolute left-20 top-0 bg-[#FAF7F0] z-99 h-screen rounded-tr-2xl rounded-br-2xl shadow-[8px_0_10px_-2px_rgba(0,0,0,0.3)] border-r border-stone-300'>
            <div className='px-4 mb-4'>
                <h2 className='text-2xl font-medium mb-4'>Search</h2>
                <input type="text" name="searched" id="" />
                <input 
                    type="search" 
                    name="searchInput" 
                    id="searchInput"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                        // searchFunction(e.target.value)
                    }}
                    className='bg-white rounded-xl w-full p-2 outline-none'
                    placeholder='Search' 
                    autoComplete='off'
                />
            </div>
            <div className='border-t border-stone-300 w-full pt-4 '>

                {
                    loading ? (
                        <div className="w-full h-[70vh] flex justify-center items-center">
                            <div className="w-6 h-6 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : searchInput === "" ? (
                        <div className=''>
                            {/* recent search */}
                            <div className='w-full'>
                                <div className='flex justify-between items-end  px-4 pb-2.5'>
                                    <h4 className='text-lg font-medium'>Recent</h4>
                                    <p className="text-[#F27C3A] font-medium text-sm hover:underline">Clear all</p>
                                </div>
                                <div className='flex justify-between items-center hover:bg-gray-200 w-full  px-4 py-2 cursor-pointer'>
                                    <div className='flex gap-2.5 items-center'>
                                        <div className='w-9 h-9 overflow-hidden rounded-full'>
                                            {/* <Image src="https://instagram.fcmn1-2.fna.fbcdn.net/v/t51.2885-19/288867788_1193484761211720_3457915817086878493_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby43NTEuYzIifQ&_nc_ht=instagram.fcmn1-2.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QFZhMo8nwK5t_3vlKrPTahqXpA9fVn9YpExgWNKNBHS-Y1Hkb4M82JTkdzC5sNnLEo&_nc_ohc=yfXJuLdinm8Q7kNvwFf7Upv&_nc_gid=le0FiaAIO6RLcibU7DOVNg&edm=AHzjunoBAAAA&ccb=7-5&oh=00_AfT9ziAhveUneJ0o4b510XJLFB81IhsFyd5BJT3tnlQNQg&oe=68911899&_nc_sid=ba8368" alt="profileImage" width={32} height={32} /> */}
                                            <img src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fs3.amazonaws.com%2Fstartuplist.africa%2Fstartups%2Fgomycode%2Fgomycode-logo.png&sp=1753959106Tf9213b44f1f4f8411be73fec45edff8452f25963a16c39684b693a28b7c13d59"/>
                                        </div>
                                        <div>
                                            <p className='text-sm font-semibold'>gomycode.morocco</p>
                                            <p className='text-stone-500'>GOMYCODE Morocco</p>
                                        </div>
                                    </div>
                                    <div className='text-stone-500'><X/></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className=''>
                            {
                                searchResult?.length > 0
                                ? (
                                    searchResult?.map((v, index) => (
                                        <Link  
                                            href={`/${v._id}`} 
                                            onClick={() => {
                                                setIsSearchActive(false)
                                                setIsSideBClosed(false)
                                            }} 
                                            className=' w-full block '
                                            key={index} 
                                        >
                                            <div className='w-full hover:bg-stone-200 px-4 py-1.5 cursor-pointer'>
                                                <div className='flex gap-2.5 items-center'>
                                                    {
                                                        v?.profileImage
                                                        ? (
                                                            <div className='w-9 h-9 border border-stone-300 rounded-full  flex justify-center items-center overflow-hidden cursor-pointer ' >
                                                                <Image src={`${v?.profileImage}`} width={36} height={36} alt='profile image' className='object-cover' unoptimized />
                                                            </div>
                                                        ):(
                                                            <div className=' w-9 h-9 border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer ' >
                                                                <UserRound size={32} fill="white" strokeWidth={0}  className='relative top-1' />
                                                            </div>
                                                        )
                                                    }
                                                    <div>
                                                        <p className='text-sm font-semibold'>{v.username}</p>
                                                        <p className='text-stone-500 max-w-10/12 truncate text-sm whitespace-pre-line line-clamp-1 '>{v.bio || ""}</p>
                                                    </div>
                                                </div>
                                                {/* <div className='text-stone-500'><X/></div> */}
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className='text-stone-500 w-full h-[70vh] flex justify-center items-center'>No users found</p>
                                )
                            }
                            
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchBar
