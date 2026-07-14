const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { username, text } = req.body;
    
    if (!username || !text) {
      return res.status(400).json({
        success: false,
        error: 'Username and text are required'
      });
    }

    const message = new Message({
      username,
      text,
      timestamp: new Date()
    });

    await message.save();
    
    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();
    
    res.status(200).json({
      success: true,
      data: messages.reverse()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};