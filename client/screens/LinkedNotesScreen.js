// screens/LinkedNotesScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { API } from '../config';

export default function LinkedNotesScreen() {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLinkedNotes = async () => {
    if (!topic.trim()) {
      Alert.alert("Enter a topic to search linked notes");
      return;
    }
    setLoading(true);
    try {
      const encodedTopic = encodeURIComponent(topic);
      const res = await axios.get(`${API}/related/${encodedTopic}`);
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch linked notes error:", err?.response?.data || err.message);
      Alert.alert("Failed to fetch notes for this topic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🔗 Linked Notes by Concept</Text>

      <TextInput
        placeholder="Enter a topic (e.g., React Native)"
        value={topic}
        onChangeText={setTopic}
        style={styles.input}
      />

      <Button title="🔍 Fetch Linked Notes" onPress={fetchLinkedNotes} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {notes.map((note, index) => (
        <View key={index} style={styles.noteCard}>
          <Text style={styles.noteLabel}>📄 Note:</Text>
          <Text style={styles.noteContent}>{note.content}</Text>

          <Text style={styles.noteLabel}>🔍 Concepts:</Text>
          <Text style={styles.noteConcepts}>{note.concepts?.join(', ')}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  noteCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  noteLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 14,
  },
  noteConcepts: {
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 5,
  },
});
