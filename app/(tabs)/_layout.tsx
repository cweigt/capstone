import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useImage } from '@/context/ImageContext';
import { useAuth } from '@/context/AuthContext';

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const { image } = useImage();
  const { user } = useAuth();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifs"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bell" color={color} />,
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
              <IconSymbol size={28} name="person.circle.fill" color={color} />
            )
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;