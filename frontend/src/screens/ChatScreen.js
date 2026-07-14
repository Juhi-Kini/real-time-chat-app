import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useChat } from '../context/ChatContext';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import OnlineUsers from '../components/OnlineUsers';
import TypingIndicator from '../components/TypingIndicator';

const ChatScreen = ({ navigation }) => {
  const {
    messages,
    username,
    onlineUsers,
    typingUsers,
    isConnected,
    error,
    loadChatHistory,
  } = useChat();

  const flatListRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChatHistory().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const renderMessage = ({ item }) => {
    const isOwnMessage = item.username === username;
    return <ChatMessage message={item} isOwnMessage={isOwnMessage} />;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Chat Room</Text>
      <View style={styles.headerStatus}>
        <View style={[
          styles.statusDot,
          isConnected ? styles.statusConnected : styles.statusDisconnected
        ]} />
        <Text style={styles.headerSubtitle}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading chat history...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <OnlineUsers onlineUsers={onlineUsers} />
      
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id || item.timestamp.toString()}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No messages yet</Text>
              <Text style={styles.emptySubtext}>Say hello to start the conversation!</Text>
            </View>
          }
        />
        
        {Object.keys(typingUsers).filter(user => typingUsers[user] && user !== username).length > 0 && (
          <TypingIndicator users={Object.keys(typingUsers).filter(user => typingUsers[user] && user !== username)} />
        )}
        
        <ChatInput username={username} />
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#8E8E93',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusConnected: {
    backgroundColor: '#34C759',
  },
  statusDisconnected: {
    backgroundColor: '#FF3B30',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    paddingVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#8E8E93',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#AEAEB2',
    marginTop: 8,
  },
  errorContainer: {
    backgroundColor: '#FF3B30',
    padding: 10,
  },
  errorText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default ChatScreen;