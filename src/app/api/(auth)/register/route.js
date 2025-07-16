import { NextResponse } from "next/server";
import connect from "../../../../../lib/dbConnect";
import User from "../../../../../lib/models/User";
import bcrypt from "bcryptjs"

export async function POST(req) {
    await connect()
    const {email, password} = await req.json()

    // check if user already exists
    const existingUser = await User.findOne({email})
    if(existingUser){
        return NextResponse.json({error: "User already exists"}, {status: 400})
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create new user
    const newUser = await User.create({
        email, 
        password: hashedPassword,
    })

    // return NextResponse.json({message: "User created", userId: newUser}, {status: 200})
    return NextResponse.json({message: "User created", userId: newUser._id}, {status: 200})
}