import { NextResponse } from "next/server";
import connect from "../../../../../../lib/dbConnect";
import Comment from "../../../../../../lib/models/Comment";
import Post from "../../../../../../lib/models/Post";
import { auth } from "@/auth";

export async function POST(req, {params}){
    try{
        const session = await auth()
        if(!session || !session.user?.id){
            return new NextResponse("unauthorized", {status: 401})
        }

        await connect()

        const userId = session.user.id;
        const {postId} = await params
        const {content} = await req.json()

        if(!content){
            return new NextResponse("Comment content is required", {status: 400})
        }

        const newComment = await Comment.create({
            postId,
            author: userId,
            content,
        })

        await Post.findByIdAndUpdate(postId, {
            $push: {comments: newComment._id}
        })

        return NextResponse.json(newComment)
    }catch(error){
        console.log("Error creating comment: ", error)
        return new NextResponse("Server error: " + error.message, {status: 500})
    }
}

export async function GET(req, {params}){
    try{
        await connect()
        const {postId} = await params

        const comments = await Comment.find({postId})
        .populate('author', 'username profileImage')
        .sort({createdAt: -1})

        return NextResponse.json(comments)
    }catch(error){
        console.log("Error getting comments: ", error)
        return new NextResponse("Server error: " + error.message, {status: 500})
    }
}