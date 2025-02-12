const express = require("express")
const userRouter=express.Router();
const {registerUser,login}=require("../controller/User.Cont");

userRouter.post("/user/signup", registerUser);
userRouter.post("/user/login", login);

module.exports = userRouter;