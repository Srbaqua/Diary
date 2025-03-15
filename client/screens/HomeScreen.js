import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>📘 MAJ - Home</Text>
      <Button title="Upload Notes" onPress={() => navigation.navigate('UploadFileNote')} />
      <Button title="Concept Map" onPress={() => navigation.navigate('ConceptMap')} />
      <Button title="Search Related Notes" onPress={() => navigation.navigate('RelatedNotes')} />
      <Button title="Upload AI Note" onPress={() => navigation.navigate('UploadAINote')} />


    </View>
  );
}