import { NextResponse } from "next/server";
import connect from "../../../../../lib/dbConnect";
import Post from "../../../../../lib/models/Post";

export const GET = async (req, {params}) => {
    try{
        await connect()
        const { id } = await params
        // const post = await Post.find({author: id}).sort({createdAt: -1})
        const post = await Post.find({author: id})
        .populate('author', 'username bio profileImage followers')
        .sort({createdAt: -1})

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

export const DELETE = async (req, {params}) => {
    try{
        await connect()
        const {id} = await params
        const deletedPost = await Post.findByIdAndDelete(id)
        return new NextResponse("post deleted: " + deletedPost, {status: 200})
    }catch(error){
        return new NextResponse("Error deleting post: " + error.message, {
            status: 500
        })
    }
}

export const PATCH = async (req, {params}) => {
    try{
        await connect()
        const {id} = await params
        const formData = await req.formData()
        const content = formData.get("content")

        const post = await Post.findById(id)
        if(!post){
            return new NextResponse("Post not found", {status: 404})
        }

        const createdAt = new Date(post.createdAt);
        const now = new Date();
        const timeDiff = now - createdAt;
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (timeDiff > twentyFourHours) {
            return new NextResponse("Post can no longer be edited (after 24h)", { status: 403 });
        } 

        post.content = content;
        await post.save();

        return NextResponse.json({
            message: 'post updated',
            post
        }, {status: 200})
    } catch (error){
        return new NextResponse("Error editing post: " + error.message, {
            status: 500
        })
    }
}