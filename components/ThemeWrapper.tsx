import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 