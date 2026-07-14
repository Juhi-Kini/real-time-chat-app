import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useChat } from '../context/ChatContext';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { setUsername: setGlobalUsername } = useChat();

  const handleLogin = () => {
    const trimmed = username.trim();
    if (!trimmed) {
      setError('Please enter a username');
      return;
    }
    if (trimmed.length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }
    setError('');
    setGlobalUsername(trimmed);
    navigation.replace('Chat');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Chat</Text>
        <Text style={styles.subtitle}>Enter a username to start chatting</Text>
        
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username..."
          autoFocus
          maxLength={20}
        />
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Join Chat</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;