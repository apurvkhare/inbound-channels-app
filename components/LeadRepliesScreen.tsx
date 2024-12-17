import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface LeadReply {
  id: string;
  content: string;
  timestamp: string;
}

export default function LeadRepliesScreen() {
  const [replies, setReplies] = useState<LeadReply[]>([]);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchLeadReplies();
  }, []);

  const fetchLeadReplies = async () => {
    try {
      const response = await fetch('http://192.168.1.10:3000/lead-replies');
      const data = await response.json();
      setReplies(data);
    } catch (error) {
      console.error('Error fetching lead replies:', error);
    }
  };

  const handleReply = async () => {
    if (replyText.trim() === '') return;

    try {
      const response = await fetch('http://192.168.1.10:3000/send-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyText }),
      });

      if (response.ok) {
        setReplyText('');
        fetchLeadReplies();
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const renderItem = ({ item }: { item: LeadReply }) => (
    <View style={styles.item}>
      <Text style={styles.itemContent}>{item.content}</Text>
      <Text style={styles.itemTimestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={replies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.replyContainer}>
        <TextInput
          style={styles.input}
          value={replyText}
          onChangeText={setReplyText}
          placeholder="Type your reply..."
        />
        <TouchableOpacity style={styles.button} onPress={handleReply}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemContent: {
    fontSize: 16,
  },
  itemTimestamp: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  replyContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 4,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

