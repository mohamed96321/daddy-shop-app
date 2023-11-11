const Product = require('../models/Product');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

exports.getProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
};

exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found.');
  }
};

exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, userId, title } = req.body;

  const product = await Product.findById(req.params.id);

  const user = await User.findById(userId);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed.');
    }
    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    };

    product.reviews.push(review);

    product.numberOfReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Review has been saved.' });
  } else {
    res.status(404);
    throw new Error('Product not found.');
  }
});
