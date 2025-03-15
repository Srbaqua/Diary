import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, ScrollView, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadAINote } from '../services/api';

export default function UploadAINoteScreen() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const getMimeType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
    if (ext === 'png') return 'image/png';
    if (ext === 'pdf') return 'application/pdf';
    if (ext === 'txt') return 'text/plain';
    return 'application/octet-stream';
  };

  const handlePickAndUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result?.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const selectedFile = {
          uri: file.uri,
          name: file.name,
          mimeType: file.mimeType || getMimeType(file.name),
        };

        setLoading(true);
        const res = await uploadAINote("123", selectedFile); // Replace with dynamic userId if needed
        setResponse(res?.note);
      } else {
        Alert.alert("No file selected");
      }
    } catch (err) {
      console.error("Upload AI Note Error:", err?.response?.data || err.message);
      Alert.alert("Upload Failed", "Something went wrong while uploading your file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Upload AI Note (Auto Processed)</Text>

      <Button title="📂 Pick & Upload File" onPress={handlePickAndUpload} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {response && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>✅ Uploaded Successfully</Text>

          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>📄 Improved Note Content:</Text>
          <Text style={{ marginBottom: 15 }}>{response.content}</Text>

          <Text style={{ fontWeight: 'bold' }}>🔍 Extracted Concepts:</Text>
          <Text>{response.concepts?.join(', ') || 'None detected'}</Text>
        </View>
      )}
    </ScrollView>
  );
}
