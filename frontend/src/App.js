import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ChatProvider } from './context/ChatContext';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ChatProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChatProvider>
  );
}