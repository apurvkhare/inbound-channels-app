import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LeadEvent {
  id: string;
  type: string;
  timestamp: string;
}

export default function LeadEventsScreen() {
  const [events, setEvents] = useState<LeadEvent[]>([]);

  useEffect(() => {
    fetchLeadEvents();
  }, []);

  const fetchLeadEvents = async () => {
    try {
      const response = await fetch('http://192.168.1.10:3000/lead-events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching lead events:', error);
    }
  };

  const renderItem = ({ item }: { item: LeadEvent }) => (
    <View style={styles.item}>
      <Ionicons name={getIconName(item.type)} size={24} color="#007AFF" />
      <View style={styles.itemContent}>
        <Text style={styles.itemType}>{item.type}</Text>
        <Text style={styles.itemTimestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  const getIconName = (type: string): string => {
    switch (type) {
      case 'Opened Email':
        return 'mail-open-outline';
      case 'Visited Website':
        return 'globe-outline';
      case 'Opened SMS':
        return 'chatbubble-outline';
      default:
        return 'alert-circle-outline';
    }
  };

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemContent: {
    marginLeft: 15,
  },
  itemType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTimestamp: {
    fontSize: 14,
    color: '#888',
  },
});

