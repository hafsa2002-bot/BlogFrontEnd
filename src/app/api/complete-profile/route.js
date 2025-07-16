import { NextResponse } from "next/server";
import connect from "../../../../lib/dbConnect";
import User from "../../../../lib/models/User";
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req){
    await connect()
    const formData = await req.formData()

    const userId = formData.get("userId")
    const username = formData.get("username")
    const bio = formData.get("bio")
    const profileImage = formData.get("profileImage")
    let imageUrl = ""

    if(profileImage && typeof profileImage === "object"){
        const arrayBuffer = await profileImage.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {folder: "users/avatars"},
                    (error, result) => {
                        if(error) reject(error)
                            resolve(result)
                    }
                )
                .end(buffer)
        });
        imageUrl = result.secure_url;
    }

    const updateUser = await User.findByIdAndUpdate(userId,{
        username,
        bio,
        profileImage : imageUrl
    });

    return NextResponse.json({
        message: "Profile updated",
        user: updateUser
    }, {status: 200})
}