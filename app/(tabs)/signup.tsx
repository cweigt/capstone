import { StyleSheet, View, Text, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
import { ThemedView } from '@/components/ThemedView';
import { auth } from '@/firebase';
import { TouchableOpacity } from 'react-native';


//this is actually the account page
const Sign_Up = () => {
      //managing state here to push to component
      const [authUser, setAuthUser] = useState(null);
      const [showSignUp, setShowSignUp] = useState(false);
    
      //this is for a listener so I know what user is currently authenticated
      useEffect(() => {
        const listener = auth.onAuthStateChanged((authUser) => {
          //console.log('Auth state changed (pre-reload):', authUser);
      
          if (authUser) {
            authUser.reload(); //wait for reload
            const refreshedUser = auth.currentUser; //this will now include displayName
            //console.log('Refreshed user:', refreshedUser.displayName);
            setAuthUser(refreshedUser);
          } else {
            setAuthUser(null);
          }
        });
      
        return () => listener(); // cleanup
      }, []);
      
    
      useEffect(() => {
        console.log('Updated auth user', authUser); //undefined
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
              {/*This will be for the sign out function using conditional rendering*/}
              {authUser ? (
                <>
                  <Text style={styles.welcomeText}>
                    Welcome, {authUser.displayName}! {/*This is the line that is breaking with displayName*/}
                  </Text>
                  <Button //button tags are self closing in native
                    title="Sign Out" //declaring what will be displayed on button, not in between both tags
                    onPress={() => { //don't forget curly brace with multi-line executions
                      auth.signOut();
                      setAuthUser(null);
                      window.alert(`Auth user signed out: ${authUser.email}`);
                    }}
                  />
                </>
              ) : (
                <>
                  {showSignUp ? (
                    <SignUp setUser={setAuthUser}/>
                  ) : (
                    <SignIn setUser={setAuthUser}/>
                  )}
                  <TouchableOpacity onPress={() => setShowSignUp(!showSignUp)}>
                    <Text style={styles.toggleText}>
                      {showSignUp ? 'Already have an account? Sign in.'
                      : "Don't have an account? Sign up."}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              
              
              
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
    toggleText: {
      marginTop: 15,
      color: '#007AFF',
      textAlign: 'center',
      fontWeight: '500',
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 15,
      marginTop: 10,
    },
  });


export default Sign_Up;