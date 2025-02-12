

const Cart = require('../models/ProductsCart.Schema');
const Product = require('../models/Products.Schema');
const User = require('../models/User.Schema'); 


const createOrUpdateCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;
   

    
    if (quantity <= 0) {
      return res.status(400).json({ status: 400, message: "Quantity must be greater than 0" });
    }

   
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ status: 404, message: 'Product not found' });
    }

   
    if (product.inStock <= 0) {
      return res.status(400).json({ status: 400, message: 'Product is out of stock' });
    }

   
    let cart = await Cart.findOne({ userId });

    if (cart) {
      
      const productIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());

      if (productIndex > -1) {
       
        cart.items[productIndex].quantity += quantity;
      } else {
       
        cart.items.push({ productId, quantity });
      }

      cart.updatedAt = Date.now();
      await cart.save();
      return res.json({ status: 200, message: 'Cart updated successfully', data: cart });
    } else {
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });

      await newCart.save();
      return res.status(201).json({ status: 201, message: 'Cart created successfully', data: newCart });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: 'An error occurred while updating the cart' });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.quary; 

  if (!userId) {
    return res.status(400).json({
      status: 400,
      message: 'User ID is required',
    });
  }

  try {
    
    const cart = await Cart.findOne({ userId }).populate('items.productId'); 

    if (!cart) {
      return res.status(404).json({
        status: 404,
        message: 'Cart not found for this user',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Cart fetched successfully',
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while fetching the cart',
      error: error.message,
    });
  }
};

module.exports = {
  createOrUpdateCart,getCart
};
