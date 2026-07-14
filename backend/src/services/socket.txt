const Message = require('../models/Message');

class SocketService {
  constructor(io) {
    this.io = io;
    this.users = new Map();
    this.setupSocketHandlers();
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Handle user login
      socket.on('user-login', (username) => {
        socket.username = username;
        this.users.set(socket.id, username);
        
        // Broadcast online users
        this.broadcastOnlineUsers();
        
        // Notify others
        socket.broadcast.emit('user-joined', {
          username,
          timestamp: new Date()
        });
      });

      // Handle new message
      socket.on('send-message', async (data) => {
        try {
          const { username, text } = data;
          
          // Save to database
          const message = new Message({
            username,
            text,
            timestamp: new Date(),
            delivered: false,
            read: false
          });
          
          await message.save();
          
          // Broadcast to all connected clients
          this.io.emit('new-message', {
            ...message.toObject(),
            delivered: true
          });
          
          // Send delivery confirmation
          socket.emit('message-delivered', {
            messageId: message._id,
            delivered: true
          });
          
        } catch (error) {
          socket.emit('message-error', {
            error: 'Failed to send message'
          });
        }
      });

      // Handle typing indicator
      socket.on('typing', (data) => {
        socket.broadcast.emit('user-typing', {
          username: data.username,
          isTyping: data.isTyping
        });
      });

      // Handle read receipts
      socket.on('message-read', async (messageId) => {
        try {
          await Message.findByIdAndUpdate(messageId, { 
            read: true,
            delivered: true
          });
          
          socket.broadcast.emit('message-read', {
            messageId
          });
        } catch (error) {
          console.error('Error marking message as read:', error);
        }
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        const username = socket.username;
        if (username) {
          this.users.delete(socket.id);
          this.broadcastOnlineUsers();
          
          socket.broadcast.emit('user-left', {
            username,
            timestamp: new Date()
          });
        }
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  broadcastOnlineUsers() {
    const userList = Array.from(this.users.values());
    this.io.emit('online-users', userList);
  }
}

module.exports = SocketService;