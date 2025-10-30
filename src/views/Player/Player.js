import React from 'react';
import { View, StyleSheet } from 'react-native';
import { STREAM_URL } from '../../constants/config';
import { HLSPlayer } from '../../components';

const Player = () => {
  return (
    <View style={styles.container}>
      <HLSPlayer URL={STREAM_URL} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default Player;
