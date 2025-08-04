//this controls the navigation bar tabs and what is their, but also their graphics

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { typography } from '@/styles/theme';
import { useImage } from '@/context/ImageContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const TabLayout = () => {
  const { image } = useImage();
  const { user } = useAuth();
  const { theme } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,
        tabBarLabelStyle: { 
          fontSize: typography.caption.fontSize
        },
        tabBarStyle: {
          backgroundColor: theme.background,
          ...Platform.select({
            ios: {
              shadowColor: theme.text,
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 4,
            },
          }),
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feeds',
          tabBarAccessibilityLabel: 'Feeds Tab', // Voice control label
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarAccessibilityLabel: 'Account Tab', // Voice control label
          tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person" color={color} />
     ),
        }}
      />
      <Tabs.Screen
        name="savedArticles"
        options={{
          title: 'Saved',
          tabBarAccessibilityLabel: 'Saved Articles Tab', // Voice control label
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default TabLayout;