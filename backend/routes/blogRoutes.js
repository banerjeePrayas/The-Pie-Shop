import express from 'express';
const router = express.Router();
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').get(getBlogs).post(protect, admin, createBlog); 

router.route('/:id').put(protect, admin, updateBlog).get(getBlogById).delete(protect, admin, deleteBlog)


export default router;

