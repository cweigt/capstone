import { 
  StyleSheet, 
  Text, 
  Image, 
  Button, 
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
// import { ThemedView } from '@/components/ThemedView';
import { auth } from '@/firebase';

const Sign_Up = () => {
    const [authUser, setAuthUser] = useState(null);
    const [showSignUp, setShowSignUp] = useState(false);
  
    useEffect(() => {
        const listener = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                authUser.reload();
                const refreshedUser = auth.currentUser;
                setAuthUser(refreshedUser);
            } else {
                setAuthUser(null);
            }
        });
        return () => listener();
    }, []);
  
    useEffect(() => {
        console.log('Updated auth user', authUser);
    }, [authUser]);

    return (
      <ParallaxScrollView 
          headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }} //#A1CEDC
          headerHeight={175}
          headerImage={
              <Image
                source={require('@/assets/images/aurora-wdc.png')}
                style={styles.auroraLogo}
              />
            }>
          <View style={{backgroundColor: "white"}}>
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
  toggleText: {
    marginTop: 0,
    marginBottom: 10,
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
