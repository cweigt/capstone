import { 
  StyleSheet, 
  Text, 
  Image, 
  Button, 
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
import ResetPassword from '@/components/ResetPassword';
import DisplayImage from '@/components/DisplayImage';
// import { ThemedView } from '@/components/ThemedView';
import { auth } from '@/firebase';
import { useAuth } from '@/context/AuthContext';

const Sign_Up = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [image, setImage] = useState(null);
    const {user} = useAuth();

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
            {user ? (
              <>
                <Text style={styles.welcomeText}>
                  Welcome, {user.displayName}! {/*This is the line that is breaking with displayName*/}
                </Text>
                <DisplayImage image={image} setImage={setImage}/>
                <Button //button tags are self closing in native
                  title="Sign Out" //declaring what will be displayed on button, not in between both tags
                  onPress={() => { //don't forget curly brace with multi-line executions
                    auth.signOut();
                  }}
                />
                <ResetPassword />
                {/*this is placeholder for the account information component*/}
              </>
            ) : (
              <>
                {showSignUp ? (
                  <SignUp setUser={setShowSignUp} />
                ) : (
                  <SignIn setUser={setShowSignUp} />
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
