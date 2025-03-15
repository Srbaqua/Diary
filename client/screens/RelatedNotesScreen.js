import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native';
import { searchNotesByTopic } from '../services/api';

export default function RelatedNotesScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await searchNotesByTopic(query);
      setResults(res);
    } catch (err) {
      console.error("Search Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderNote = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
      <Text style={{ fontWeight: 'bold' }}>{item.noteType?.toUpperCase() || 'NOTE'}</Text>
      <Text>{item.content}</Text>
      {item.fileUrl && (
        <Text style={{ color: 'blue' }}>📎 File: {item.fileUrl}</Text>
      )}
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter topic to search..."
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
      />
      <Button title="Search Notes" onPress={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNote}
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}
