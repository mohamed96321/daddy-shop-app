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
