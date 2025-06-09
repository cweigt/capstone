import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { ROUTES } from '@/constants/Routes';
import { NotFoundStyles as styles } from '../styles/NotFound.styles';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: 'white' }]}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href={ROUTES.HOME} style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </View>
    </>
  );
}
