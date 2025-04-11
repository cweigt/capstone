import { StyleSheet, View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SignUp from '@/components/SignUp';
import { auth } from '@/firebase';

const Sign_Up = () => {

    return (
        <ParallaxScrollView 
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                  source={require('@/assets/images/aurora-wdc.png')}
                  style={styles.auroraLogo}
                />
              }>
            
            <SignUp />
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
    
  });


export default Sign_Up;