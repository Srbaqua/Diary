import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

export default function ConceptMapScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🧠 Concept Map</Text>
      <Svg height="400" width="100%">
        {/* Nodes */}
        <Circle cx="180" cy="50" r="30" stroke="black" strokeWidth="2.5" fill="#a5d8ff" />
        <SvgText x="180" y="55" fontSize="12" textAnchor="middle">React</SvgText>

        <Circle cx="90" cy="150" r="30" stroke="black" strokeWidth="2.5" fill="#ffe066" />
        <SvgText x="90" y="155" fontSize="12" textAnchor="middle">JSX</SvgText>

        <Circle cx="270" cy="150" r="30" stroke="black" strokeWidth="2.5" fill="#ffd6a5" />
        <SvgText x="270" y="155" fontSize="12" textAnchor="middle">Components</SvgText>

        {/* Edges */}
        <Line x1="180" y1="50" x2="90" y2="150" stroke="gray" strokeWidth="2" />
        <Line x1="180" y1="50" x2="270" y2="150" stroke="gray" strokeWidth="2" />
      </Svg>
      <Text style={styles.note}>📝 Later we'll fetch real concepts from DB and build this graph dynamically.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  note: { marginTop: 30, color: '#555', fontStyle: 'italic' },
});
