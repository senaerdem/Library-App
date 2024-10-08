import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HelpScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
