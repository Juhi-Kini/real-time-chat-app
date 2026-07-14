import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatTime } from '../utils/dateFormatter';

const ChatMessage = ({ message, isOwnMessage }) => {
  const { username, text, timestamp, isSystem, read, delivered } = message;

  if (isSystem) {
    return (
      <View style={styles.systemMessageContainer}>
        <Text style={styles.systemMessage}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={[
      styles.messageContainer,
      isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer
    ]}>
      {!isOwnMessage && (
        <Text style={styles.username}>{username}</Text>
      )}
      <View style={[
        styles.messageBubble,
        isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble
      ]}>
        <Text style={styles.messageText}>{text}</Text>
        <View style={styles.messageFooter}>
          <Text style={styles.timestamp}>{formatTime(timestamp)}</Text>
          {isOwnMessage && (
            <Text style={styles.status}>
              {read ? '✓✓ Read' : delivered ? '✓ Delivered' : '✓ Sent'}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  ownMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
  },
  ownMessageBubble: {
    backgroundColor: '#007AFF',
  },
  otherMessageBubble: {
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  username: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
    marginLeft: 4,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 10,
    color: '#8E8E93',
    marginRight: 8,
  },
  status: {
    fontSize: 10,
    color: '#8E8E93',
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemMessage: {
    fontSize: 12,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
});

export default ChatMessage;