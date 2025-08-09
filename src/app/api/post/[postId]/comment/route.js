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

export const DELETE = async (req, {params}) => {
    try{
        await connect()
        const {postId} = await params
        const {commentId, userId} = await req.json()

        const comment = await Comment.findById(commentId)
        if(!comment){
            return new NextResponse('Comment not found', {status: 404})
        }

        // to check if user is authorized to delete the comment
        if(comment.author.toString() !== userId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        await Comment.findByIdAndDelete(commentId)

        // remove reference from the post
        await Post.findByIdAndUpdate(postId, {
            $pull: {comments: commentId}
        })

        return new NextResponse("Comment deleted: " + comment, {status: 200})

    } catch (error) {
        return new NextResponse("Error deleting comment: " + error.message, {
            status: 500
        })
    }
}

export const PATCH = async (req, {params}) => {
    try{
        await connect()
        const formData = await req.formData()
        const commentId = formData.get("commentId")
        const content = formData.get("content")

        if (!commentId || !content) {
            return new NextResponse("Missing commentId or content", { status: 400 })
        }
        
        const comment = await Comment.findById(commentId)
        if(!comment){
            return new NextResponse("Comment not found", {status:404})
        }

        const createdAt = new Date(comment.createdAt)
        const now = new Date()
        const timeDiff = now - createdAt
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if(timeDiff > twentyFourHours){
            return new NextResponse("Comment can no longer be edited (after 24h)", {status: 403})
        }

        comment.content = content
        await comment.save()

        return NextResponse.json({
            message: 'comment updated',
            comment
        }, {status: 200})
    }catch(error){
        return new NextResponse("Error editing comment: " + error.message, {
            status: 500
        })
    }
}