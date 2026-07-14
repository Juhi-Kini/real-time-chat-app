import io from 'socket.io-client';

// IMPORTANT: Change this to YOUR computer's IP address (same as above)
// For example, if your IP is 192.168.1.100:
const SOCKET_URL = 'http://192.168.100.144:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = {};
  }

  connect(username) {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.socket.emit('user-login', username);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
      }
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  disconnect() {
    if (this.socket) {
      Object.keys(this.listeners).forEach(event => {
        this.listeners[event].forEach(callback => {
          this.socket.off(event, callback);
        });
      });
      this.listeners = {};
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected() {
    return this.socket && this.socket.connected;
  }
}

export default new SocketService();