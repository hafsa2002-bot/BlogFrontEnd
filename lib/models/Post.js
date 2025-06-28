import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    // title: {type: String},
    content: {type: String},
    image: {type: String},
    tags: [String],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
},{
    timestamps: true
})

export default mongoose.model('Post', postSchema)