import { X } from 'lucide-react'
import React from 'react'

function ErrorMessage({message}) {
    return (
        <div className="fixed top-2 right-1/2 translate-x-1/2 w-fit font-semibold z-50 bg-red-500 text-white  text-sm py-1.5 px-3 rounded-md mt-2 flex justify-center items-center gap-1">
            <X/> {message}
        </div>
    )
}

export default ErrorMessage
