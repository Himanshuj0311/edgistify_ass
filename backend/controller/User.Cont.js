const express = require('express');
const User = require('../models/User.Schema');
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ;

const registerUser  = async (req, res) => {
    try {
  
      const { fullName, email, password, } = req.body;

      if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }


      const isUserPresent = await User.findOne({ email });
  
      if (isUserPresent) {
        return res.status(401).json({ message: "User already registered. Please login." ,succes:false});
      }

  

      const user = new User({ fullName, email, password, });
      await user.save();

      res.status(200).send({ message: "Signup Successfull!" ,succes:true })
  
    } catch (error) {
      res.status(500).send({message:error.message,succes:false});
    }
  }


  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found",succes:false,});
      }
  
    
  
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  
      // Send response
      res.status(200).json({
        message: `${user.fullName}, You are logged in successfully!`,
        token,
        succes:true
  
      });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  
  }

  module.exports = {registerUser,login}