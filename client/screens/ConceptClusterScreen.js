import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { API } from '../config';

export default function ConceptClusterScreen({ navigation }) {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);

  useEffect(() => {
    fetchConcepts();
  }, []);

  const fetchConcepts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/concepts`); // Updated endpoint path
      setConcepts(res.data.concepts || []);
    } catch (err) {
      console.error("Concept fetch error:", err);
      Alert.alert("Failed to fetch concepts");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotesByConcept = async (concept) => {
    setSelectedConcept(concept);
    setNotes([]);
    setNotesLoading(true);
    try {
      const res = await axios.get(`${API}/related/${concept}`); // Updated endpoint path
      setNotes(res.data || []);
    } catch (err) {
      console.error("Notes fetch error:", err);
      Alert.alert("Failed to fetch notes for this concept");
    } finally {
      setNotesLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🧠 Concept Clusters</Text>

      {loading ? <ActivityIndicator size="large" /> : (
        <View style={styles.grid}>
          {concepts.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => fetchNotesByConcept(item.name)}
            >
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedConcept && (
        <View style={{ marginTop: 30 }}>
          <Text style={styles.subheading}>📂 Notes under "{selectedConcept}"</Text>
          {notesLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            notes.length > 0 ? notes.map((note, idx) => (
              <View key={idx} style={styles.noteCard}>
                <Text style={styles.noteContent}>{note.content}</Text>
                <Text style={styles.noteConcepts}>🔍 Concepts: {note.concepts?.join(', ')}</Text>
              </View>
            )) : <Text>No notes found for this concept.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    width: '48%',
    elevation: 2,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  noteCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 14,
  },
  noteConcepts: {
    marginTop: 6,
    fontStyle: 'italic',
    fontSize: 12,
  },
});
