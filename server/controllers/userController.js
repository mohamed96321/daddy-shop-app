const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
};

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

exports.register = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.json(400);
    throw new Error('We already have an account with that email address.');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.json(400);
    throw new Error('Invalid user data.');
  }
});


exports.updateUserProfile = asyncHandler(async(req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: genToken(updateUser._id),
      createdAt: updateUser.createdAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

exports.getUserOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({user: req.params.id});
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('No orders found');
  }
});
