import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>📘 MAJ - Home</Text>
      <Button title="Upload Notes" onPress={() => navigation.navigate('UploadNote')} />
      <Button title="Concept Map" onPress={() => navigation.navigate('ConceptMap')} />
    </View>
  );
}