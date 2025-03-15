// import React, { useState } from 'react';
// import { View, TextInput, Button, Text } from 'react-native';
// import { uploadTextNote } from '../services/api';

// export default function UploadNoteScreen() {
//   const [text, setText] = useState('');
//   const [response, setResponse] = useState(null);

//   const handleUpload = async () => {
//     const res = await uploadTextNote("123", text);
//     setResponse(res);
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput
//         placeholder="Write your note here..."
//         multiline
//         style={{ borderWidth: 1, padding: 10, height: 150 }}
//         value={text}
//         onChangeText={setText}
//       />
//       <Button title="Upload Note" onPress={handleUpload} />
//       {response && <Text style={{ marginTop: 10 }}>Note Uploaded ✅</Text>}
//     </View>
//   );
// }

import React from "react";
import { View, Text, Button } from "react-native";

export default function UploadNote({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>📘 MAJ - Home</Text>
      <Button
        title="Upload Notes"
        onPress={() => navigation.navigate("UploadNote")}
      />
      <Button
        title="Concept Map"
        onPress={() => navigation.navigate("ConceptMap")}
      />
    </View>
  );
}
