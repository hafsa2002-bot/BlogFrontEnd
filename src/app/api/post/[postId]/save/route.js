import { NextResponse } from "next/server";
import connect from "../../../../../../lib/dbConnect";
import Post from "../../../../../../lib/models/Post";
import { auth } from "@/auth";
import User from "../../../../../../lib/models/User";

// get all saved posts

// save a post 
export async function POST(req, {params}){
    try{
        const session = await auth()
        if(!session || !session.user?.id){
            return new NextResponse("Unauthorized", {status: 401})
        }

        await connect()
        const userId = session.user.id
        const {postId} = await params

        const user = await User.findById(userId)
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        if (!user.savedPosts) {
            user.savedPosts = [];
        }


        const alreadySaved = user.savedPosts.some(
            (id) => id.toString() === postId
        )

        if(alreadySaved){
            // unsave
            user.savedPosts = user.savedPosts.filter(
                (id) => id.toString() !== postId
            )
        }else{
            // save
            user.savedPosts.push(postId)
        }

        user.savedPosts = [...new Set(user.savedPosts.map(id => id.toString()))]
        console.log("Before saving, savedPosts: ", user.savedPosts);
        await user.save()
        const updatedUser = await User.findById(userId);
        console.log("After saving, DB savedPosts:", updatedUser.savedPosts);
    
        const action = alreadySaved ? "unsaved" : "saved";
        console.log(`post: ${action}`)
        return NextResponse.json({ message: `Post ${action}`, postId }, {status: 200})
    }catch(error){
        console.log("Error saving post: ", error)
        return new NextResponse("Server error: " + error.message, {status: 500})
    }
}