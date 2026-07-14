import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TypingIndicator = ({ users }) => {
  if (!users || users.length === 0) return null;

  const displayText = users.length === 1 
    ? `${users[0]} is typing...`
    : `${users.length} people are typing...`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#F2F2F7',
  },
  text: {
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
});

export default TypingIndicator;