import { Check } from 'lucide-react'
import React from 'react'

function SuccessMessage({message}) {
  return (
    <div>
        <div className="fixed top-2 right-1/2 translate-x-1/2 w-fit font-semibold z-50 bg-green-500 text-white  text-sm py-1.5 px-3 rounded-md mt-2 flex justify-center items-center gap-1 transition-opacity duration-300">
            <Check/> {message}
        </div>
    </div>
  )
}

export default SuccessMessage
