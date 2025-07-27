import { UserRound } from 'lucide-react'
import React from 'react'

function Unknown({width, height, size, top}) {
  return (
    <div className={`w-${width} h-${height} border-2 border-stone-300 rounded-full bg-stone-300 text-white flex justify-center items-end overflow-hidden cursor-pointer`}>
        <UserRound fill="white" strokeWidth={0} size={size} className={`relative top-${top}`} />
    </div>
  )
}

export default Unknown
