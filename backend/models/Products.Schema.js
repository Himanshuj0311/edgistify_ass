const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be a positive number']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  inStock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock must be at least 0'],
  },
  imageUrl: {
    type: String, 
    default: 'default-image-url'
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
