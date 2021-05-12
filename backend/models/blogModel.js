import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    name: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId, //To Obtain OBJECT ID
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const blogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //To Obtain OBJECT ID
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [commentSchema],
}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;