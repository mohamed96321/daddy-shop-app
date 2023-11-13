const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

exports.createOrder = asyncHandler(async (req, res) => {
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
      username: userInfo.name,
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

exports.getOrders = async (req, res, next) => {
  const orders = await Order.find({});
  res.json(orders);
};

exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found.');
  }
});

exports.updateSetDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order could not be updated.');
  }
});
