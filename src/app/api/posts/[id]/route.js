import { NextResponse } from "next/server";
import connect from "../../../../../lib/dbConnect";
import Post from "../../../../../lib/models/Post";

export const GET = async (req, {params}) => {
    try{
        await connect()
        const { id } = await params
        const post = await Post.findById(id)

        if(!post){
            return new NextResponse("Post not found", {status: 404})
        }

        return new NextResponse(JSON.stringify(post), {status: 200})
    }catch(error){
        return new NextResponse("Error fetching post: " + error.message, {
            status: 500
        })
    }
}