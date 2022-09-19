import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tuks.GymKing',
  appName: 'Gym King',
  webDir: 'build',
  plugins: {
    PushNotifications: {
        presentationOptions: ["badge", "sound", "alert"]
    }
 },
  bundledWebRuntime: false
};

export default config;
