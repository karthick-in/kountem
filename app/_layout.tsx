import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import { useColorScheme, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  if (!isMounted) {
    return null; // Or a simple splash-matching background View
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
