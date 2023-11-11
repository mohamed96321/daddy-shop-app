const express = require('express');
const productController = require('../controllers/productController');
const isAuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post(
  '/reviews/:id',
  isAuthMiddleware.protectRoutes,
  productController.createProductReview
);

module.exports = router;
