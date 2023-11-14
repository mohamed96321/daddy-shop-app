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
router.put(
  '/',
  isAuthMiddleware.protectRoutes,
  isAuthMiddleware.admin,
  productController.updateProduct
);
router.delete(
  '/:id',
  isAuthMiddleware.protectRoutes,
  isAuthMiddleware.admin,
  productController.deleteProduct
);
router.post(
  '/',
  isAuthMiddleware.protectRoutes,
  isAuthMiddleware.admin,
  productController.createNewProduct
);

router.put(
  '/:productId/:reviewId',
  isAuthMiddleware.protectRoutes,
  isAuthMiddleware.admin,
  productController.removeProductReview
);

module.exports = router;
