import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useChat } from '../context/ChatContext';
import socketService from '../services/socketService';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const { sendMessage, username } = useChat();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleChangeText = (text) => {
    setMessage(text);
    
    if (!isTyping && text.length > 0) {
      setIsTyping(true);
      socketService.emit('typing', { username, isTyping: true });
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    if (text.length === 0) {
      setIsTyping(false);
      socketService.emit('typing', { username, isTyping: false });
    } else {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        socketService.emit('typing', { username, isTyping: false });
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={handleChangeText}
        placeholder="Type a message..."
        multiline
        maxLength={500}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          !message.trim() && styles.sendButtonDisabled
        ]}
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F2F2F7',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ChatInput;