import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ConceptMapScreen from './screens/ConceptMapScreen';
import UploadFileNoteScreen from './screens/UploadFileNoteScreen';

import RelatedNotesScreen from './screens/RelatedNotesScreen';

import UploadAINoteScreen from './screens/UploadAiNoteScreen';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="UploadNote" component={UploadFileNoteScreen} /> */}
        <Stack.Screen name="UploadAINote" component={UploadAINoteScreen} />
        <Stack.Screen name="RelatedNotes" component={RelatedNotesScreen} />
        <Stack.Screen name="ConceptMap" component={ConceptMapScreen} />
        <Stack.Screen name="UploadFileNote" component={UploadFileNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// checking for upload