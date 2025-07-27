import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', requird: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true}
}, {timestamps: true})

// export default mongoose.model('Comment', commentSchema)
export default mongoose.models.Comment || mongoose.model('Comment', commentSchema)