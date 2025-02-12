const express = require("express")
const productRouter=express.Router();
const authenticateUser = require('../middlewares/Authentication.Middle')
const { addProduct,getAllProducts}=require("../controller/Product.Cont");
const {createOrUpdateCart, getCart}=require("../controller/ProductsCarts.Cont");
const {placeOrder, getOrders}=require('../controller/Order.Cont')


productRouter.post("/addProduct", addProduct);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.post("/addToCart", createOrUpdateCart);
productRouter.post("/getCart", getCart);
productRouter.post("/createOrder", authenticateUser, placeOrder);
productRouter.get("/getOrders", getOrders);

module.exports = productRouter;