import connect from "../../../../../lib/dbConnect";
import User from "../../../../../lib/models/User";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await connect()
        const {email} = await req.json();
        const user = await User.findOne({email}).select
    }catch(error){
        console.log(error)
    }
}