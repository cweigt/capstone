import { 
  Text, 
  Image, 
  Button, 
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
import ResetPassword from '@/components/ResetPassword';
import UploadImage from '@/components/UploadImage';
import { useAuth } from '@/context/AuthContext';
import { AccountStyles as styles } from '@/styles/Account.styles';
import NameChange from '@/components/NameChange';
import { router } from 'expo-router';
import { ROUTES } from '@/constants/Routes';
import { auth } from '@/firebase';

const Sign_Up = () => {
    const [showSignUp, setShowSignUp] = useState(false);
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
            }
      >
          <View style={{backgroundColor: "white", flex: 1, paddingBottom: 250}}>
            {user ? (
              <>
                <Text style={styles.welcomeText}>
                  Welcome, {user.displayName}!
                </Text>
                
                <View style={styles.cardContainer}>
                  <TouchableOpacity
                    onPress={() => router.push(ROUTES.PROFILE)}
                    style={styles.menuItem}
                  >
                    <Text style={styles.menuItemText}>Profile</Text>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => router.push(ROUTES.SAVED)}
                    style={styles.menuItem}
                  >
                    <Text style={styles.menuItemText}>Saved Articles</Text>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.push(ROUTES.LEGAL)}
                    style={styles.menuItem}
                  >
                    <Text style={styles.menuItemText}>Legal</Text>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <TouchableOpacity
                        onPress={() => {
                            auth.signOut();
                            //router.replace(ROUTES.ACCOUNT);
                        }}
                        style={{ alignItems: 'center' }}
                    >
                        <Text style={styles.signOut}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
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

export default Sign_Up;
