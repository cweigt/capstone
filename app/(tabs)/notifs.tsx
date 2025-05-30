import { 
  StyleSheet, 
  View, 
  Text, 
  Image 
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { useAuth } from '@/context/AuthContext';

const Notifications = () => {
  const {user} = useAuth(); //this also holds any sort of listener

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }}
      headerHeight={175}
      headerImage={
        <Image
          source={require('@/assets/images/aurora-wdc.png')}
          style={styles.auroraLogo}
        />
      }
    >
      <View style={{ backgroundColor: 'white' }}>
        {user ? (
          <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.message}>You don't have any notifications yet.</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.message}>Please sign in to view notifications.</Text>
          </View>
        )}
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  auroraLogo: {
    marginTop: 1,
    marginLeft: 33,
    height: 175,
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
    textAlign: 'left',
    marginTop: 20,
    color: '#666',
  },
});

export default Notifications;