import { 
  Text, 
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
// import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { ROUTES } from '@/constants/Routes';
import { AccountStyles as styles } from '@/styles/Account.styles';
import { auth } from '@/firebase';
import DisplayImage from '@/components/DisplayImage';

const Sign_Up = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            router.replace(ROUTES.FEEDS);
        }
    }, [user]);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={['top']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            {user ? (
              <>
                <Text style={styles.title}>
                  My Account
                </Text>
                <View style={styles.divider} />
                
                <DisplayImage />
                <Text style={styles.welcomeText}>
                  {user.displayName}
                </Text>

                <TouchableOpacity
                    onPress={() => router.push('/account/profile')}
                    style={styles.links}
                  >
                    <Text style={styles.editProfile}>Edit Profile →</Text>
                  </TouchableOpacity>

                <View style={{ paddingBottom: 200 }}></View>

                <View style={styles.legalContainer}>
                   <Text style={styles.legal}>
                    Legal Information
                   </Text>
                    <TouchableOpacity
                      onPress={() => router.push('/eula')}
                      style={styles.links}
                    >
                      <Text style={styles.links}>End User License Agreement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => router.push('/privacy-policy')}
                      style={styles.links}
                    >
                      <Text style={styles.links}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            auth.signOut();
                            //router.replace(ROUTES.ACCOUNT);
                        }}
                        style={{ alignItems: 'center', paddingTop: 40 }}
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
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default Sign_Up;
 