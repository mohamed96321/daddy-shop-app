const express = require('express');
const userController = require('../controllers/userController');
const isAuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', userController.loginUser);
router.post('/signup', userController.registerUser);
router.put(
  '/profile/:id',
  isAuthMiddleware.protectRoutes,
  userController.updateUserProfile
);
router.get(
  '/:id',
  isAuthMiddleware.protectRoutes,
  userController.getUserOrders
);

router.get(
  '/',
  isAuthMiddleware.protectRoutes,
  isAuthMiddleware.admin,
  userController.getUsers
);
router.delete(
  '/:id',
  isAuthMiddleware.protectRoutes,
  isAuthMiddleware.admin,
  userController.deleteUser
);

module.exports = router;
