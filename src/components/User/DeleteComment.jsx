import React, { useState } from 'react'
import axios from 'axios'

function DeleteComment({setDeleteCommentPopUp, userId, commentId, postId, setComments}) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async() => {
        try{
            setLoading(true)
            const res = await axios.delete(`/api/post/${postId}/comment`, {
                data: { 
                    commentId, 
                    userId
                }
            })
            setComments(comments => comments.filter(com => com._id !== commentId))
            setDeleteCommentPopUp(null);
            console.log("comment deleted: ", res.data)
        } catch (err) {
            console.log("Error: ", err)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='w-screen h-screen top-0  right-0 fixed z-50 flex justify-center items-center ' style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <div className='bg-white flex flex-col justify-center items-center border border-stone-300 rounded-lg w-1/4 pt-4'>
                <h3 className='text-lg font-semibold px-4'>Delete the comment?</h3>
                <p className='text-stone-600 text-[15px] text-center px-4 mt-3'>If you delete this comment, you won&apos;t be able to restore it.</p>
                <div className='border-t border-stone-300 flex w-full mt-5'>
                    <div
                        onClick={() => setDeleteCommentPopUp(null)}
                        className='w-1/2 border-r border-stone-300 text-center cursor-pointer font-medium py-3'
                    >
                        Cancel
                    </div>
                    <div
                        // onClick={handleDelete} 
                        onClick={!loading ? handleDelete : undefined} 
                        className={`w-1/2 text-center py-3 font-bold cursor-pointer ${loading ? 'text-gray-400' : 'text-red-500'}`}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default DeleteComment
