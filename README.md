# 💬 Real-Time Chat Application

A full-stack real-time chat application built with React Native (Expo) and Node.js + Socket.io. This application allows users to send and receive messages instantly with features like typing indicators, online/offline status, and message read receipts.

## 🚀 Live Demo

[Link to screen recording]

## ✨ Features

### Core Features
- ✅ **Send Messages** - Users can send messages to the chat room
- ✅ **Real-time Communication** - Messages appear instantly using Socket.io
- ✅ **Chat History** - Messages persist and load on page refresh
- ✅ **Message Timestamps** - Each message shows when it was sent
- ✅ **REST APIs** - Backend APIs for sending messages and fetching history
- ✅ **Connection Handling** - Graceful handling of user connections and disconnections

### Bonus Features
- ✅ **Username-based Login** - Simple authentication without passwords
- ✅ **Typing Indicator** - Shows when other users are typing
- ✅ **Online/Offline Status** - See who's currently online
- ✅ **Message Read/Delivered Status** - ✓ Sent, ✓✓ Read status indicators
- ✅ **MongoDB Storage** - Messages stored in MongoDB database

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React Native (Expo) | Cross-platform mobile/web framework |
| Socket.io Client | Real-time communication |
| React Navigation | Screen navigation |
| Context API | State management |
| Axios | HTTP requests |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express | Web framework |
| Socket.io | WebSocket server |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| Helmet | Security headers |
| Express Rate Limit | API rate limiting |

## 📁 Project Structure

chatapp/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── database.js # MongoDB connection
│ │ ├── models/
│ │ │ └── Message.js # Message schema
│ │ ├── controllers/
│ │ │ └── messageController.js # Message handlers
│ │ ├── routes/
│ │ │ └── messageRoutes.js # API routes
│ │ ├── services/
│ │ │ └── socketService.js # Socket.io logic
│ │ ├── utils/
│ │ │ └── errorHandler.js # Error handling
│ │ └── index.js # Server entry point
│ ├── .env # Environment variables
│ └── package.json
└── frontend/
├── src/
│ ├── components/
│ │ ├── ChatMessage.js # Individual message component
│ │ ├── ChatInput.js # Message input component
│ │ ├── OnlineUsers.js # Online users list
│ │ └── TypingIndicator.js # Typing indicator component
│ ├── screens/
│ │ ├── LoginScreen.js # Login screen
│ │ └── ChatScreen.js # Main chat screen
│ ├── services/
│ │ ├── apiService.js # API calls
│ │ └── socketService.js # Socket.io service
│ ├── context/
│ │ └── ChatContext.js # Global state management
│ ├── utils/
│ │ └── dateFormatter.js # Date formatting utilities
│ └── App.js # App entry point
├── app.json
└── package.json


## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Expo CLI (for mobile development)

### Backend Setup

**1. Navigate to backend directory:**
```bash
cd backend

2. Install dependencies:

bash
npm install
3. Create .env file:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatapp
NODE_ENV=development
4. Start MongoDB (if using local):

bash
mongod --dbpath C:\data\db
5. Start the backend server:

bash
npm run dev
The backend will run on http://localhost:5000
