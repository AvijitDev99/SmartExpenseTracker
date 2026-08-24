const getRuntimeExtra = () => ({
  appEnv: process.env.APP_ENV ?? 'development',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? '',
  easProjectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID ?? '',
  mediaBaseUrl: process.env.EXPO_PUBLIC_MEDIA_BASE_URL ?? '',
});

module.exports = ({ config }) => ({
  ...config,

  extra: {
    ...config.extra,
    ...getRuntimeExtra(),
  },

  plugins: [
    ...(config.plugins ?? []),
    'expo-font',
    'expo-image',
    'expo-secure-store',
    'expo-status-bar',
  ],
});