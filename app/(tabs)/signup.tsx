import { StyleSheet, View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SignUp from '@/components/SignUp';
import { ThemedView } from '@/components/ThemedView';
import { auth } from '@/firebase';

const Sign_Up = () => {
  //managing state here to push to component
  const [authUser, setAuthUser] = useState(null);

  //this is for a listener so I know what user is currently authenticated
  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      console.log('Auth user in listener', authUser); //logging to terminal
      if(authUser) {
        setAuthUser(authUser); //updating with the current user
      } else {
        setAuthUser(null); //setting this to null if nothing is there
      }

    });
    return () => listener();
  }, []); //empty dependendace array makes it run once when component mounts

  useEffect(() => {
    console.log('Updated auth user', authUser);
  }, [authUser]); //updates everytime auth user is updated

    return (
        <ParallaxScrollView 
            headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }} //#A1CEDC
            headerImage={
                <Image
                  source={require('@/assets/images/aurora-wdc.png')}
                  style={styles.auroraLogo}
                />
              }>
            <ThemedView style={{backgroundColor: "white"}}>
              <SignUp setUser={setAuthUser}/>
              {/*This will be for the sign out function using conditional rendering*/}
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
    
  });


export default Sign_Up;