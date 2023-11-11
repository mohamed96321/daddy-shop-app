const express = require('express');
const orderController = require('../controllers/orderController');
const isAuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', isAuthMiddleware.protectRoutes, orderController.createOrder);

module.exports = router;
