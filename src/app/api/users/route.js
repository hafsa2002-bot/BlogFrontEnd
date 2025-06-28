import { NextResponse } from "next/server"
import connect from "../../../../lib/dbConnect"
import User from "../../../../lib/models/User";

// get all users
export const GET = async() =>  {
    try{
        await connect();
        const users = await User.find();
        console.log("users: ", users)
        return new NextResponse(JSON.stringify(users), {status: 200})
    } catch(error){
        return new NextResponse("Error in fetching users" + error.message, {status: 500})
    }
}

// add user
export const POST = async (req) => {
    try{
        const body = await req.json()
        await connect()
        const newUser = new User(body);
        await newUser.save()
        return new NextResponse(
            JSON.stringify({message: "User is created", user: newUser}),
            {status: 200}
        )
    } catch(error){
        return new NextResponse("Error in creating user" + error.message, {
            status: 500,
        })
    }
}