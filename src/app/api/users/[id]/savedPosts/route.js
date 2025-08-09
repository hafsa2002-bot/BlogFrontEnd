import { NextResponse } from "next/server";
import connect from "../../../../../../lib/dbConnect";
import User from "../../../../../../lib/models/User";

// get saved posts by user id
export const GET = async(req, {params}) => {
    try{
        await connect();
        const {id} = await params
        const user = await User.findById(id)
            .populate({
                path: 'savedPosts',
                select: 'author content image likes comments createdAt',
                options: {sort: {createdAt: -1}},
                populate: {
                    path: 'author',
                    select: 'username profileImage bio followers'
                }
            })

        if(!user){
            return new NextResponse("User not found", {status: 404})
        }

        return NextResponse.json(user, {status: 200})
    }catch(error){
        return new NextResponse("Error in fetching saved posts")
    }
}