import React from 'react';
import { View, Text, Linking, StyleSheet, ScrollView } from 'react-native';

export default function AppContent() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Me</Text>

      <Text style={styles.text}>
        Hi, I'm <Text style={styles.bold}>Muhammad Azhar Iqbal</Text>. I build
        mobile and web applications using modern technologies.
      </Text>

      <Text style={styles.text}>
        This app is a basic template that serves as the parent for multiple
        sub-features. One of its sub-features is my portfolio, divided into
        separate branches for each project.
      </Text>

      <Text
        style={[styles.text, styles.link]}
        onPress={() =>
          Linking.openURL('https://github.com/muhammadazhariqbal/rn-demos')
        }
      >
        View my GitHub repository
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});
