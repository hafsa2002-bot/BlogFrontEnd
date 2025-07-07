import React from 'react'
import Navbar from './Navbar'
import SideBar from './User/SideBar'
import ExplorePosts from './ExplorePosts'

function HomePage() {

  return (
    <div className='flex justify-between w-full'>
        {/* <Navbar/> */}
        {/* <div className='flex justify-between px-4 w-full '>
            <div className='w-[17%]  border-r border-stone-300'>
                <SideBar/>
            </div>
            <div  className=' w-[50%] rounded-xl overflow-hidden mt-10'>
                <ExplorePosts/>
            </div>
            <div className='w-[20%]'>

            </div>
        </div> */}
        <div className='w-9/12 '>
          <ExplorePosts/>
        </div>
        <div className='w-1/12 '>
          {/* <ExplorePosts/> */}
          {/* <p>Hello</p> */}
        </div>
    </div>
  )
}

export default HomePage
