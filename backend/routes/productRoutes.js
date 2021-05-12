import express from 'express';
const router = express.Router();
import { getProductById, getProducts, deleteProduct, createProduct, updateProduct, 
    createProductReview, getTopProducts } from '../controllers/productControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'



router.route('/').get(getProducts).post(protect, admin, createProduct); 
/* router.route('/').get(getProducts); */

router.get('/top', getTopProducts)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);
/* router.route('/:id').get(getProductById); */

router.route('/:id/reviews').post(protect, createProductReview)





export default router;