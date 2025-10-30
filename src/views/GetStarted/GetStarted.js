import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { REPO_URL } from '../../constants/config';

export default function GetStarted({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('Player');
  };
  const openGitHub = () => {
    Linking.openURL(REPO_URL);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HLS Player</Text>

      <Text style={styles.paragraph}>
        This is one of the features of streaming HLS. A small local server
        handles RTSP to HLS streaming and exposes it via Cloudflare tunnels. You
        can use the generated URL to play the stream in this player.
      </Text>
      <Text
        style={styles.githubText}
        onPress={openGitHub}
        accessibilityRole="link"
      >
        GitHub repo for local server.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    textAlign: 'left',
    color: '#333',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 5,
    width: '99%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  githubText: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
