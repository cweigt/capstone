import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

import RSSFeed from '@/components/RSSFeed';

const HomeScreen = () => {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/aurora-wdc.png')}
          style={styles.auroraLogo}
        />
      }>


      <ThemedView>
          <RSSFeed />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  auroraLogo: {
    marginTop: 1,
    marginLeft: 33,
    height: 250,
    width: 330,
    resizeMode: 'contain',
  },
  
});

export default HomeScreen;
