import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', requird: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true}
}, {Timestamps: true})

export default mongoose.model('Comment', commentSchema)