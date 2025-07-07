import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connect from "../../../../../lib/dbConnect";
import User from "../../../../../lib/models/User";

export async function GET(){
    try{
        const session = await auth();

        if(!session || !session.user?.id){
            return new NextResponse("Unauthorized", {status: 401});
        }
        await connect()
        const user = await User.findById(session.user.id).select("-password")
        if(!user){
            return new NextResponse("User not found", {status: 404})
        }
        return NextResponse.json(user)
    }catch(error){
        return new NextResponse("Server error: " + error.message, {status: 500})
    }
}