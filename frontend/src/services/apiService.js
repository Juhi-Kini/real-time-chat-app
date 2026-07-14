import axios from 'axios';

// Use localhost for web, or your IP for mobile
const API_URL = 'http://localhost:5000/api';

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessageAPI = async (username, text) => {
  try {
    const response = await apiService.post('/messages', { username, text });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to send message' };
  }
};

export const getChatHistory = async () => {
  try {
    const response = await apiService.get('/messages');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch chat history' };
  }
};