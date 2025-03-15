import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadFileNote } from '../services/api';


export default function UploadFileNoteScreen() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // or specific: 'image/*', 'audio/*', 'video/*'
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setFile(result);
      }
    } catch (err) {
      console.log("File pick error:", err);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      Alert.alert("File Required", "Please select a file to upload.");
      return;
    }

    setLoading(true);
    try {
      const res = await uploadFileNote("123", text, file);
      setResponse(res?.note);
      setFile(null);
      setText('');
    } catch (err) {
      console.error("Upload error:", err);
      Alert.alert("Error", "Failed to upload file note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Upload File Note</Text>

      <Button title="Pick File" onPress={pickFile} />
      {file && <Text style={{ marginTop: 10 }}>📁 Selected: {file.name}</Text>}

      <TextInput
        placeholder="Optional text description..."
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginTop: 15 }}
        value={text}
        onChangeText={setText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 15 }} />
      ) : (
        <Button title="Upload Note" onPress={handleUpload} style={{ marginTop: 15 }} />
      )}

      {response && <Text style={{ marginTop: 15, color: 'green' }}>✅ File uploaded successfully!</Text>}
    </View>
  );
}
