const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  },
  delivered: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);