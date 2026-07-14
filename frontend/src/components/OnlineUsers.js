import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const OnlineUsers = ({ onlineUsers }) => {
  if (!onlineUsers || onlineUsers.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.usersContainer}>
          <Text style={styles.label}>Online ({onlineUsers.length}): </Text>
          {onlineUsers.map((user, index) => (
            <View key={index} style={styles.userTag}>
              <View style={styles.dot} />
              <Text style={styles.username}>{user}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8FC',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#8E8E93',
    marginRight: 8,
  },
  userTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
    marginRight: 4,
  },
  username: {
    fontSize: 14,
    color: '#000',
  },
});

export default OnlineUsers;