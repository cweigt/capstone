import React from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '@/context/AuthContext';
import { ImageProvider } from '@/context/ImageContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ThemeWrapper } from '@/components/ThemeWrapper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <ImageProvider>
          <AuthProvider>
            <Stack screenOptions={{
              headerShown: false,
            }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBarWrapper />
          </AuthProvider>
        </ImageProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
}

//this allows the status bar to change also based on the user selection
const StatusBarWrapper = () => {
  const { mode } = useTheme();

  return (
  < StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
  );
}
