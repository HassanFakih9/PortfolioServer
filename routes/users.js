const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { username, pass } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username,pass });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User with the same username  already exists' });
      }
  
      // Create a new user
      const user = new User({ username, pass });
      user.email="";
      await user.save();
  
      res.status(201).json({ message: 'success' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.post('/check', async (req, res) => {
    const { username, pass } = req.body;
  
    try {
      const existingUser = await User.findOne({ username, pass });
  
      if (existingUser) {
        return res.status(200).json({ message: 'success' });
      }
  
      res.status(200).json({ message: 'Incorrect username or password' });
    } catch (error) {
      console.error('Error checking user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;