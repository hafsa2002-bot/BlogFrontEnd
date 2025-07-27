import Post from "../../../../../../lib/models/Post";
import { auth } from "@/auth";
import connect from "../../../../../../lib/dbConnect";
import { NextResponse } from "next/server";

// like a post
export async function PATCH (req, {params}){
    try{
        const session = await auth()
        if(!session || !session.user?.id){
            return new NextResponse("Unauthorized", {status: 401})
        }

        await connect();

        const userId = session.user.id;
        const {postId} = await params
        // const postId = params.id;
        console.log("Looking for post ID:", postId)

        const post = await Post.findById(postId)
        if(!post){
            return new NextResponse("Post not found", {status: 404})
        }
        // const alreadyLiked = post.likes.includes(userId);
        const alreadyLiked = post.likes.some((id) => id.toString() === session.user.id)

        if(alreadyLiked){
            // unlike
            post.likes = post.likes.filter((id) => id.toString() !== userId)
        } else {
            // like
            post.likes.push(userId)
        }

        post.likes = [...new Set(post.likes.map(id => id.toString()))]
        await post.save()

        return NextResponse.json({
            likes: post.likes,
            liked: !alreadyLiked,
        })
    }catch(error){
        return new NextResponse("Server error: " + error.message, {status: 500})
    }
}

// list of users who liked the post
export async function GET(req, {params}){
    try{
        await connect();
        const {postId} = await params

        const post = await Post.findById(postId)
        .populate("likes", "username profileImage bio")

        if(!post){
            return new NextResponse("post not found", {status: 404})
        }

        const likedUsers = post.likes;
        return NextResponse.json(likedUsers)
    }catch(error){
        console.log("Error getting likes: ", error)
        return new NextResponse("Server error: " + error.message, {status: 500})
    }
}
