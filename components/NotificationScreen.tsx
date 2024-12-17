import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Notification {
  id: string;
  content: string;
  timestamp: string;
}

export default function NotificationScreen() {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    fetchLatestNotification();
  }, []);

  const fetchLatestNotification = async () => {
    try {
      const response = await fetch('http://192.168.1.10:3000/latest-notification');
      const data = await response.json();
      setNotification(data);
    } catch (error) {
      console.error('Error fetching latest notification:', error);
    }
  };

  if (!notification) {
    return (
      <View style={styles.container}>
        <Text>No new notifications</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.content}>{notification.content}</Text>
      <Text style={styles.timestamp}>{notification.timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
  },
});

