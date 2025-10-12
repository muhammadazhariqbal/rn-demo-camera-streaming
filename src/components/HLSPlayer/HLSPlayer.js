import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const HLSPlayer = ({ URL }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buffering, setBuffering] = useState(false);

  // REPLACE WITH YOUR  HLS URL
  const STREAM_URL = URL;

  // ADD YOUR AUTHENTICATION HEADERS IF NEEDED
  const customHeaders = {
    // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    // 'Referer': 'https://your-domain.com',
  };

  const onBuffer = buffer => {
    console.log('Buffering:', buffer);
    setBuffering(buffer.isBuffering);
  };

  const onError = err => {
    console.error('Video Error:', err);
    console.error('Error details:', JSON.stringify(err, null, 2));

    if (Platform.OS === 'ios') {
      setError(
        `iOS Error: ${
          err.error?.localizedDescription ||
          err.error?.domain ||
          'Unknown error'
        }`,
      );
    } else if (
      err.error?.errorCode === '22004' ||
      err.error?.errorString?.includes('BAD_HTTP_STATUS')
    ) {
      setError(
        'Access denied (403). Check authentication or stream permissions.',
      );
    } else {
      setError(
        `Failed to load stream: ${err.error?.errorString || 'Unknown error'}`,
      );
    }
    setLoading(false);
  };

  const onLoad = data => {
    console.log('Video loaded successfully:', data);
    setLoading(false);
    setError(null);
  };

  const onLoadStart = () => {
    console.log('Load start');
    setLoading(true);
  };

  const onReadyForDisplay = () => {
    console.log('Ready for display');
    setLoading(false);
  };

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const videoSource = {
    uri: STREAM_URL,
    ...(Platform.OS === 'android' && { headers: customHeaders }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={videoSource}
          style={styles.video}
          paused={paused}
          resizeMode="contain"
          onBuffer={onBuffer}
          onError={onError}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onReadyForDisplay={onReadyForDisplay}
          repeat={false}
          controls={false}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          mixWithOthers="duck"
          pictureInPicture={false}
          fullscreen={false}
          selectedVideoTrack={{
            type: 'auto',
          }}
          audioOnly={false}
          muted={false}
          volume={1.0}
          rate={1.0}
          progressUpdateInterval={1000}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>
              Loading stream on {Platform.OS}...
            </Text>
          </View>
        )}

        {buffering && !loading && (
          <View style={styles.bufferingContainer}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayPause}
          >
            <Text style={styles.playPauseText}>{paused ? '▶' : '⏸'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>HLS Stream HLSPlayer</Text>
        <Text style={styles.subtitle}>
          Platform: {Platform.OS} {Platform.Version}
        </Text>
        <Text style={styles.debugText}>
          {loading ? 'Loading...' : error ? 'Error' : 'Ready'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  videoContainer: {
    width: width,
    height: width * 0.5625,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  bufferingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorHint: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'left',
    marginTop: 10,
  },
  playPauseButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseText: {
    color: '#fff',
    fontSize: 20,
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',

    marginBottom: 8,
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  debugText: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 8,
  },
});

export default HLSPlayer;
