import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.brian.flashapp',
  appName: 'Flash',
  webDir: 'dist',
  plugins: {
    Camera: {
      cameraPermissionText: "We need your permission to use your camera to scan QR codes"
    }
  }
};

export default config;
