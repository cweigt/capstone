import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

const Notifications = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/aurora-wdc.png')}
          style={styles.auroraLogo}
        />
      }
    >
      <ThemedView>
        <View style={styles.container}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.message}>You don't have any notifications yet.</Text>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  auroraLogo: {
    marginTop: 1,
    marginLeft: 33,
    height: 250,
    width: 330,
    resizeMode: 'contain',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
});

export default Notifications;
