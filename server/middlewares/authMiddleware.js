const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

exports.protectRoutes = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // 1 = Token and 0 = Bearer
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token!')
  }
});
