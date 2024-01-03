// routes/messages.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../models/message')
router.post('/api/messages', async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      console.log('User ID:', req.user._id);
  
      const { text } = req.body;
      const newMessage = new Message({ text, user: req.user._id });
      const savedMessage = await newMessage.save();
  
      console.log('Saved Message:', savedMessage);
  
      res.status(201).json(savedMessage);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
