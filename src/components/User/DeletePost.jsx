import React from 'react'

function DeletePost({setDeletePostPopUp, postId}) {
  return (
    <div className='w-screen h-screen top-0  right-0 fixed z-50 flex justify-center items-center ' style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <div className='bg-white flex flex-col justify-center items-center border border-stone-300 rounded-lg w-1/4 pt-4'>
            <h3 className='text-lg font-semibold px-4'>Delete the post?</h3>
            <p className='text-stone-600 text-[15px] text-center px-4 mt-3'>If you delete this post, you won&apos;t be able to restore it.</p>
            <div className='border-t border-stone-300 flex w-full mt-5'>
                <div
                    onClick={() => setDeletePostPopUp(false)}
                    className='w-1/2 border-r border-stone-300 text-center cursor-pointer font-medium py-3'
                >
                    Cancel
                </div>
                <div className='text-red-500 font-bold cursor-pointer w-1/2 text-center py-3'>Delete</div>
            </div>
            {/* <p className='text-3xl'>delete post: {postId}</p>
            <div onClick={() => setDeletePostPopUp(false)} className='text-red-500 underline cursor-pointer'> close</div> */}
        </div>
    </div>
  )
}

export default DeletePost
