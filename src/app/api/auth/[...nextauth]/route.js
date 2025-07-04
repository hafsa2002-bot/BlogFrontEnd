// import GitHubProvider from "next-auth/providers/github"
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials"
// import connect from "../../../../../lib/dbConnect";
// import User from "../../../../../lib/models/User";
// import bcrypt from "bcryptjs"

// const handler = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials:{
//                 email: {label: "Email", type: "text"},
//                 password: {label: "Password", type: "password"},
//             },
//             async authorize(credentials){
//                 await connect()

//                 const user = await User.findOne({email: credentials.email})
//                 if(!user) throw new Error("User not found")
                
//                 const isMatch = await bcrypt.compare(credentials.password, user.password)
//                 if(!isMatch) throw new Error("Invalid password")
                    
//                 return{
//                     id: user._id.toString(),
//                     email: user.email,
//                 }
//             }
//         }),
//         GitHubProvider({
//             clientId: process.env.AUTH_GITHUB_ID,
//             clientSecret: process.env.AUTH_GITHUB_SECRET,
//         }),
//     ],
//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.AUTH_SECRET,
//     pages: {
//         signIn: "/login",
//         error: "/login",
//     },

// })

// export {handler as GET, handler as POST}



import { handlers } from "@/auth"; // adjust the path if needed

export const { GET, POST } = handlers;
