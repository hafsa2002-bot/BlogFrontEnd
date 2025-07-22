import {NextResponse} from 'next/server'
import Post from '../../../../../lib/models/Post'
import connect from '../../../../../lib/dbConnect'
export async function GET(request, {params}){
    try{
        await connect()
        const {postId} = await params
    
        const post = await Post.find({_id: postId})
        if(!post){
            return new NextResponse("post not found", {status: 404})
        }

        return new NextResponse(JSON.stringify(post), {status: 200})
    }catch(error){
        return new NextResponse("Error fetching post: " + error.message, {
            status: 500
        })
    }
}