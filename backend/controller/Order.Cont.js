const Order = require('../models/Order.Schema');
const Cart = require('../models/ProductsCart.Schema');
const Product = require('../models/Products.Schema');


const placeOrder = async (req, res) => {
  const { userId, shippingAddress } = req.body;

  if (!userId || !shippingAddress) {
    return res.status(400).json({
      status: 400,
      message: 'User ID and shipping address are required',
    });
  }

  try {
   
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'No products found in the cart',
      });
    }

    // Calculate the total price from the cart
    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const { productId, quantity } = item;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: `Product with ID ${productId} not found`,
        });
      }

      const itemPrice = product.price * quantity;
      totalPrice += itemPrice;

      orderItems.push({
        productId,
        quantity,
        price: itemPrice,
      });
    }

    
    const order = new Order({
      userId,
      products: orderItems,
      totalPrice,
      shippingAddress,
    });

   
    await order.save();

    
    await Cart.deleteOne({ userId });

   
    return res.status(201).json({
      status: 201,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while placing the order',
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
   
    const { page = 1, limit = 10, status, userId, _id } = req.query; 
  
    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: 'User ID is required',
      });
    }
  
    try {
    
      const filters = {  };
  
     if(_id) filters._id=_id;
     if(userId) filters.userId=userId;
     if (status) filters.orderStatus = status;
      
  
     
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      const skip = (pageNumber - 1) * limitNumber;
  
     
      const orders = await Order.find(filters).populate('products.productId')
        .skip(skip) 
        .limit(limitNumber)
        .sort({ createdAt: -1 }); 
  
   
      const totalOrders = await Order.countDocuments(filters);
  
      const totalPages = Math.ceil(totalOrders / limitNumber);
  
      return res.status(200).json({
        status: 200,
        message: 'Orders fetched successfully',
          data:orders,
          pagination: {
            totalOrders,
            totalPages,
            currentPage: pageNumber,
            limit: limitNumber,
          },
      
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'An error occurred while fetching orders',
        error: error.message,
      });
    }
  };
  

module.exports = {
  placeOrder, getOrders
};
