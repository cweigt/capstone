import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

// import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { ROUTES } from '@/constants/Routes';
import { NotFoundStyles as styles } from '../styles/NotFound.styles';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: 'white' }]}>
        <Text type="title">This screen doesn't exist.</Text>
        <Link href={ROUTES.HOME} style={styles.link}>
          <Text type="link">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
