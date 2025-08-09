import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String},
    // image: {type: String},
    images: {type: [String], default: []},
    tags: [String],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
},{
    timestamps: true
})

// export default mongoose.model('Post', postSchema)
export default mongoose.models.Post || mongoose.model('Post', postSchema)