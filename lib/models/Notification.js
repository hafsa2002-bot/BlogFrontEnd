import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    type: {type: String, enum: ['like', 'comment', 'follow'], required: true},
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}, 
    isRead: {type: Boolean, default: false}
}, {timestamps: true})

export default mongoose.model('Notification', notificationSchema)