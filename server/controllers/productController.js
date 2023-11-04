const Product = require('../models/Product');

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
