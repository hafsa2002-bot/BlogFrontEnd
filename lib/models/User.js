// import {Schema, model, models} from 'mongoose'

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: false, sparse: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio: {type: String, default: ""},
    profileImage: {type: String, default: ''},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    following: [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    role: {type: String, enum: ['user', 'admin'], default: 'user'}
},{
    timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema)