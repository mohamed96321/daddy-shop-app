const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    paymentDetails,
    userInfo,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items.');
  } else {
    const order = new Order({
      orderItems,
      user: userInfo._id,
      userName: userName.name,
      email: userInfo.email,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
