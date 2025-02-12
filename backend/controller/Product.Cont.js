const Product = require('../models/Products.Schema'); 
const mongoose = require('mongoose')

const addProduct = async (req, res) => {
  try {
    
    const { name, description, price, category, inStock, imageUrl } = req.body;

   
    if (!name || !description || !price || !category || !inStock) {
      return res.status(400).json({
        status: 400,
        message: 'All fields are required: name, description, price, category, and inStock'
      });
    }

   
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      inStock,
      imageUrl,
    });

   
    await newProduct.save();

    
    return res.status(201).json({
      status: 201,
      message: 'Product added successfully',
      data: newProduct
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while adding the product',
      error: error.message
    });
  }
};

const getAllProducts = async(req,res)=>{
    
        try {
          
          const { page = 1, limit = 10, search = '' ,_id, name, description, category, price} = req.query;
      
         
          const pageNumber = parseInt(page, 10);
          const limitNumber = parseInt(limit, 10);
      
         
          const skip = (pageNumber - 1) * limitNumber;
      
          // Build the filter object
          const filters = {};
          if(_id) filters._id =(_id);
          
      
          if (search) {
            filters.$or = [
              { name: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } },
              { category: { $regex: search, $options: 'i' } },
              { price: { $regex: search, $options: 'i' } },
            ];
          }
      
         
          const product = await Product.find(filters)
            .skip(skip)             
            .limit(limitNumber)      
            .sort({ createdAt: -1 }); 
      
          
          const totalProduct = await Product.countDocuments(filters);
      
      
          const totalPages = Math.ceil(totalProduct / limitNumber);
      
      
          return res.json({
            status: 200,
            message: 'Product fetched successfully',
            data: {
             product,
              succes:true,
              pagination: {
                totalProduct,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber,
              },
            },
          });
        } catch (error) {
          console.error('Error fetching users:', error);
          return res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching users',
            succes:false
          });
        }
      
}

module.exports = {
  addProduct,getAllProducts
};
