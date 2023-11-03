const dotenv = require('dotenv');
const express = require('express');
const connectToDatabase = require('./config/database');

// Routes
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
