import { NextResponse } from "next/server";
import connect from "../../../../lib/dbConnect";
import Post from "../../../../lib/models/Post";
// import { getServerSession } from "next-auth";
import { auth } from "@/auth";
// import { authOptions } from "@/auth";

// get all posts
/*
export const GET = async() => {
    try{
        await connect()
        const posts = await Post.find()
        console.log("posts: ", posts)
        return new NextResponse(JSON.stringify(posts), {status: 200})
    }catch(error){
        return new NextResponse("Error in fetching posts" + error.message, {status: 500})
    }
}
    */
export const GET = async () => {
    try{
        // const session = await getServerSession(authOptions, req)
        const session = await auth()
        if(!session){
            return new NextResponse("Unauthorized", {status: 401})
        }
        await connect();
        const posts = await Post.find({author: session.user.id})
        return new NextResponse(JSON.stringify(posts), {status: 200})
    }catch(error){
        console.error("POST ERROR:", error);
        return new NextResponse("Error fetching posts: " + error.message, {
            status: 500,
        })
    }
}

// add post
/*
export const POST = async (req) => {
    try{
        const body = await req.json()
        await connect()
        const newPost = new Post(body)
        await newPost.save()
        return new NextResponse(
            JSON.stringify({message: "Post is created", post: newPost}),
            {status: 200}
        )
    }catch(error){
        return new NextResponse("Error in creating post" + error.message, {
            status: 500,
        })
    }
}
    */

export const POST = async (req) => {
    try{
        const session = await auth()
        
        if(!session){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const body = await req.json()
        await connect()

        const newPost = new Post({
            ...body,
            author: session.user.id
        })

        await newPost.save()

        return new NextResponse(
            JSON.stringify({message: "Post created", post: newPost}),
            {status: 200}
        )
    }catch(error){
        console.error("POST ERROR:", error);
        return new NextResponse("Error creating post: " + error.message, {
            status: 500
        })
    }
}