import React from 'react'
import Navbar from './Navbar'
import SideBar from './User/SideBar'
import ExplorePosts from './ExplorePosts'

function HomePage() {

  return (
    <div>
        {/* <Navbar/> */}
        <div className='flex justify-between px-4 w-full '>
            <div className='w-[17%]  border-r border-stone-300'>
                <SideBar/>
            </div>
            <div  className=' w-[50%] rounded-xl overflow-hidden mt-10'>
                <ExplorePosts/>
            </div>
            <div className='w-[20%]'>

            </div>
        </div>
    </div>
  )
}

export default HomePage
