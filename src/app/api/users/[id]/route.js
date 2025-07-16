import { NextResponse } from "next/server";
import connect from "../../../../../lib/dbConnect";
import User from "../../../../../lib/models/User";

export const GET = async (req, {params}) => {
    try{
        await connect()
        const {id} = await params
        const user = await User.findById(id)

        if(!user){
            return new NextResponse("User not found", {status: 404})
        }

        return new NextResponse(JSON.stringify(user), {status: 200})
    }catch(error){
        return new NextResponse("Server error: " + error.message, {status: 500})
    }
}