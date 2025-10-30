# React Native HLS Stream Player

A React Native CLI application for streaming HLS (HTTP Live Streaming) video from Cloudflare or any HLS-compatible source.

## Prerequisites

**HLS** – Streaming with local RTSP to HLS conversion  
➡️ [View on hls-streaming branch](https://github.com/muhammadazhariqbal/rn-demos/tree/hls-streaming)


**If you have a local RTSP stream (e.g., security camera, IP camera):**

1. Follow the setup guide at: [expose-local-RTSP](https://github.com/muhammadazhariqbal/expose-local-RTSP)
2. This will help you:
   - Convert your RTSP stream to HLS format
   - Expose it to the internet via Cloudflare Tunnel
   - Get a public HTTPS URL for your stream

Once you have your HLS URL, you can use it in this React Native app.

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd rndemos
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Install iOS Pods

```bash
cd ios
pod install
cd ..
```

## ⚙️ Configuration

### Add Your HLS Stream URL

Open `src/constants/config.js` and update the stream URL:

```javascript
export const STREAM_URL = 'https://your-cloudflare-url.com/path/to/stream.m3u8';
```

### Add Authentication (if required)

If your stream requires authentication, update the headers in `src/constants/config.js`:

```javascript
export const STREAM_HEADERS = {
  Authorization: 'Bearer YOUR_TOKEN_HERE',
  'User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
};
```

## Project Structure

```
src/
├── components/
│   ├── HLSPlayer/
│   │   └── HLSPlayer.js      # Video player component
│   └── index.js
├── constants/
│   └── config.js              # ⚙️ Configure your HLS URL here
├── views/
│   ├── GetStarted/
│   │   └── GetStarted.js
│   ├── Player/
│   │   └── Player.js          # Player screen
│   └── index.js
```

## Running the App

### Android

```bash
npm run android
# or
yarn android
```

### iOS

```bash
npm run ios
# or
yarn ios
```

## Features

- ✅ HLS streaming support (HTTP Live Streaming)
- ✅ Cross-platform (iOS & Android)
- ✅ Play/Pause controls
- ✅ Loading and buffering indicators
- ✅ Error handling with detailed messages
- ✅ Support for authenticated streams
- ✅ Adaptive bitrate streaming
- ✅ Works with Cloudflare Stream

## Tech Stack

- **React Native 0.82.0**
- **react-native-video 6.17.0** - Video player component
- **React Navigation** - Navigation stack
- **TypeScript/JavaScript**

## Dependencies

```json
{
  "react": "19.1.1",
  "react-native": "0.82.0",
  "react-native-video": "^6.17.0",
  "@react-navigation/native": "^7.1.18",
  "@react-navigation/native-stack": "^7.3.27",
  "react-native-safe-area-context": "^5.6.1",
  "react-native-screens": "^4.16.0"
}
```

## Troubleshooting

### iOS Black Screen Issue

If you see a black screen on iOS:

1. **Check Info.plist** - Ensure `NSAppTransportSecurity` is configured:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

2. **Clean and rebuild**:

```bash
cd ios
rm -rf Pods Podfile.lock build
pod install
cd ..
npx react-native start --reset-cache
npx react-native run-ios
```

3. **Test URL in Safari** - Your HLS URL should work in Safari browser first

### Android 403 Error

If you get a 403 Forbidden error on Android:

- Check if your stream requires authentication
- Add proper headers in the `customHeaders` object
- Verify your Cloudflare security settings allow mobile access
- Ensure the stream is publicly accessible or has valid token

### Common Issues

- **Stream URL must be HTTPS** (not HTTP) for production
- **HLS format required** - Must be .m3u8 playlist file
- **Codec compatibility** - iOS requires H.264 video + AAC audio
- **Network permissions** - Check AndroidManifest.xml has INTERNET permission

## Usage Example

### Configuration

Update your stream URL in `src/constants/config.js`:

```javascript
export const STREAM_URL = 'https://your-stream-url.com/playlist.m3u8';
```

### Using the Player Component

```javascript
import React from 'react';
import { HLSPlayer } from './src/components';

export default function App() {
  return <HLSPlayer />;
}
```

Or navigate to the Player screen using React Navigation:

```javascript
import { Player } from './src/views';
// Use in your navigation stack
```

## 🔗 Related Projects

- [expose-local-RTSP](https://github.com/muhammadazhariqbal/expose-local-RTSP) - Convert RTSP to HLS and expose via Cloudflare

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue in the GitHub repository.

---

**Note:** Make sure you have a valid HLS stream URL before running the app. Follow the [expose-local-RTSP](https://github.com/muhammadazhariqbal/expose-local-RTSP) guide if you need to convert your local RTSP stream to HLS format.
