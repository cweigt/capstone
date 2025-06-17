import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { colors, typography } from '@/styles/theme';
import { useImage } from '@/context/ImageContext';
import { useAuth } from '@/context/AuthContext';

const TabLayout = () => {
  const { image } = useImage();
  const { user } = useAuth();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: { 
          fontSize: typography.caption.fontSize
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          ...Platform.select({
            ios: {
              shadowColor: colors.text,
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
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            user && image ? (
              <Image 
                source={{ uri: image }} 
                style={{ 
                  width: 28, 
                  height: 28, 
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: color
                }} 
              />
            ) : (
              <IconSymbol size={28} name="person" color={color} />
            )
          ),
        }}
      />
      <Tabs.Screen
        name="savedArticles"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default TabLayout;