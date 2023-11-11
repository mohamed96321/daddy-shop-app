const express = require('express');
const userController = require('../controllers/userController');
const isAuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.register);
router.put(
  '/profile/:id',
  isAuthMiddleware.protectRoutes,
  userController.updateUserProfile
);

router.get('/:id', isAuthMiddleware.protectRoutes, userController.getUserOrders);

module.exports = router;
