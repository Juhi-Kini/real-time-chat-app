import React, { createContext, useState, useContext, useEffect } from 'react';
import socketService from '../services/socketService';
import { getChatHistory } from '../services/apiService';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const loadChatHistory = async () => {
    try {
      const response = await getChatHistory();
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      setError('Failed to load chat history');
    }
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    socketService.emit('send-message', {
      username,
      text: text.trim(),
    });
  };

  useEffect(() => {
    if (!username) return;

    socketService.connect(username);
    setIsConnected(true);
    loadChatHistory();

    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    const handleTyping = (data) => {
      setTypingUsers(prev => ({
        ...prev,
        [data.username]: data.isTyping
      }));
    };

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    const handleUserJoined = (data) => {
      setMessages(prev => [...prev, {
        _id: `system-${Date.now()}`,
        username: 'System',
        text: `${data.username} joined the chat`,
        timestamp: new Date(data.timestamp),
        isSystem: true
      }]);
    };

    const handleUserLeft = (data) => {
      setMessages(prev => [...prev, {
        _id: `system-${Date.now()}`,
        username: 'System',
        text: `${data.username} left the chat`,
        timestamp: new Date(data.timestamp),
        isSystem: true
      }]);
    };

    const handleMessageDelivered = (data) => {
      setMessages(prev => prev.map(msg =>
        msg._id === data.messageId ? { ...msg, delivered: true } : msg
      ));
    };

    const handleMessageRead = (data) => {
      setMessages(prev => prev.map(msg =>
        msg._id === data.messageId ? { ...msg, read: true } : msg
      ));
    };

    socketService.on('new-message', handleNewMessage);
    socketService.on('user-typing', handleTyping);
    socketService.on('online-users', handleOnlineUsers);
    socketService.on('user-joined', handleUserJoined);
    socketService.on('user-left', handleUserLeft);
    socketService.on('message-delivered', handleMessageDelivered);
    socketService.on('message-read', handleMessageRead);
    socketService.on('message-error', (error) => {
      setError(error.error);
    });

    return () => {
      socketService.off('new-message', handleNewMessage);
      socketService.off('user-typing', handleTyping);
      socketService.off('online-users', handleOnlineUsers);
      socketService.off('user-joined', handleUserJoined);
      socketService.off('user-left', handleUserLeft);
      socketService.off('message-delivered', handleMessageDelivered);
      socketService.off('message-read', handleMessageRead);
      socketService.disconnect();
      setIsConnected(false);
    };
  }, [username]);

  const value = {
    messages,
    username,
    setUsername,
    onlineUsers,
    typingUsers,
    isConnected,
    error,
    sendMessage,
    loadChatHistory,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};