import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-10/12 rounded-full px-3 py-1 mt-6 bg-[#fccaa959] border border-gray-300 flex' >
          <div className="w-28">
            <img className='w-full' alt='logo' src='/images/logo.png' />
          </div>
          <div className='flex'>
            <div>Home</div>
            <div>Explore</div>
            <div>About</div>
            <div>Contact</div>
          </div>
          <div className='flex'>
            <div className='text-orange-500 px-2 py-1 rounded-full'>Log In</div>
            <div className='bg-[#f89e62] px-2 py-1 rounded-full'>Sign Up</div>
          </div>
      </div>
    </div>
  )
}

export default Navbar
