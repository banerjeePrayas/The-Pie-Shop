import asyncHandler from 'express-async-handler';   //Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';


// @desc      Fetch all Blog Posts
// @route     GET  /api/blogs
// @access    Public
const getBlogs = asyncHandler(async(req, res) => {

    

    const blogs = await Blog.find({})

    res.json({ blogs });
})



// @desc      Fetch Single Blog
// @route     GET  /api/blogs/:id
// @access    Public
const getBlogById = asyncHandler(async(req, res) => {

    const blog = await Blog.findById(req.params.id)
    
    if(blog) {
        res.json(blog);
    } else {
        res.status(404).json({ message: 'Blog Not Found' });
    }
})



// @desc      Create a Blog Post
// @route     POST  /api/blogs/
// @access    Private/admin
const createBlog = asyncHandler(async(req, res) => {

    const blog = new Blog({
        title: 'First Blog Post from Admin End...',
        user: req.user._id,
        image: '/images/sample.jpg',
        author: 'Admin',
        category: 'Sports',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    })

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
})


// @desc      Update a Blog Post
// @route     PUT  /api/blogs/:id
// @access    Private/admin
const updateBlog = asyncHandler(async(req, res) => {

    const { title, category, image, author, content } = req.body;

    const blog = await Blog.findById(req.params.id)


    if(blog) {
        blog.title = title;
        blog.author = author;
        blog.image = image
        blog.category = category;
        blog.content = content;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error('Blog Post Not Found');
    }
})


// @desc      Delete a Blog by ID
// @route     DELETE  /api/blogs/:id
// @access    Private/admin
const deleteBlog = asyncHandler(async(req, res) => {

    const blog = await Blog.findById(req.params.id)
    
    if(blog) {
        await blog.remove();
        res.json({
            message: 'Blog Deleted'
        })
    } else {
        res.status(404).json({ message: 'Blog Not Found' });
    }
})


export {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}