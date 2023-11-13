const express = require('express');
const orderController = require('../controllers/orderController');
const isAuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', isAuthMiddleware.protectRoutes, orderController.createOrder);
router.get(
  '/',
  isAuthMiddleware.protectRoutes,
  isAuthMiddleware.admin,
  orderController.getOrders
);
router.delete(
  '/:id',
  isAuthMiddleware.protectRoutes,
  isAuthMiddleware.admin,
  orderController.deleteOrder
);

router.put(
  '/:id',
  isAuthMiddleware.protectRoutes,
  isAuthMiddleware.admin,
  orderController.updateSetDelivered
);

module.exports = router;
