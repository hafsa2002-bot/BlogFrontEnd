import { NextResponse } from "next/server";
import connect from "../../../../lib/dbConnect";
import Post from "../../../../lib/models/Post";
// import { getServerSession } from "next-auth";
import { auth } from "@/auth";
import {v2 as cloudinary} from "cloudinary"

// import { authOptions } from "@/auth";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// get all posts
export const GET = async() => {
    try{
        await connect()
        const posts = await Post.find()
            .sort({createdAt: -1})
            .populate("author", "username bio profileImage followers")
        console.log("posts: ", posts)
        // return new NextResponse(JSON.stringify(posts), {status: 200})
        return NextResponse.json(posts, {status: 200})
    }catch(error){
        return new NextResponse("Error in fetching posts" + error.message, {status: 500})
    }
}


// Helper function to upload one file buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
        .upload_stream(
            { folder: "posts/images" },
            (error, result) => {
            if (error) reject(error);
            resolve(result);
            }
        )
        .end(buffer);
    });
};

/*
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
    */

export const POST = async (req) => {
    try {
        await connect();
        const session = await auth()
        
        if(!session){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const formData = await req.formData();

        // Get text content from formData
        const content = formData.get("content");

        // Get files (images) from formData - can be single or multiple
        const images = formData.getAll("images"); // `images` is the input name in frontend form, and can be multiple files

        const imageUrls = [];

        for (const img of images) {
            if (img && typeof img === "object") {
                const arrayBuffer = await img.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const result = await uploadToCloudinary(buffer);
                console.log("Uploaded image url:", result.secure_url);
                imageUrls.push(result.secure_url);
            }
        }

        console.log("All uploaded image URLs:", imageUrls);

        // Create new post with content, images and author info (example)
        const newPost = new Post({
            content,
            images: imageUrls, // store array of URLs
            author: session.user.id
        });

        await newPost.save();

        const savedPost = await Post.findById(newPost._id);
        console.log("Saved post images:", savedPost.images);

        return NextResponse.json(
            { message: "Post created", post: newPost },
            { status: 200 }
        );
    } catch (error) {
        console.error("POST ERROR:", error);
        return new NextResponse("Error creating post: " + error.message, {
        status: 500,
        });
    }
};