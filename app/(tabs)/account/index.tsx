import { 
  Text, 
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { ROUTES } from '@/constants/Routes';
import { AccountStyles as styles } from '@/styles/Account.styles';
import { auth } from '@/firebase';
import DisplayImage from '@/components/DisplayImage';
import { useTheme } from '@/context/ThemeContext';
import ToggleMode from '@/components/ToggleMode';

//this is the sign up page that is used to render both the sign up and sign in components
//based on current user in auth detection

const Sign_Up = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const { user } = useAuth();
    const { theme } = useTheme();

    useEffect(() => {
        if (user) {
            router.replace(ROUTES.FEEDS);
        }
    }, [user]);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={[]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}>
          <View style={{ flex: 1, backgroundColor: theme.background }}>
            {user ? (
              <>
                {/* Blue Header */}
                <View style={{ backgroundColor: theme.header, paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}>
                  <Text style={{ color: theme.text, fontSize: 24, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>
                    My Account
                  </Text>
                </View>

                <View style={{ borderBottomWidth: 1, borderBottomColor: theme.border, marginBottom: 10 }} />
                
                <DisplayImage />
                <Text style={[styles.welcomeText, { color: theme.text }]}>
                  {user.displayName}
                </Text>

                <TouchableOpacity
                    onPress={() => router.push('/account/profile')}
                    accessibilityLabel='Edit Profile Button'
                    style={[styles.profileButton, { backgroundColor: theme.containerColor, borderColor: theme.border }]}
                  >
                    <Text style={{
                      color: theme.primary,
                      fontWeight: '600',
                      fontSize: 16,
                    }}>
                      Edit Profile →
                    </Text>
                  </TouchableOpacity>
                  <ToggleMode />

                <View style={{ paddingBottom: 180 }}></View>

                <View style={styles.legalContainer}>
                   <Text style={[styles.legal, { color: theme.text }]}>
                    Legal Information
                   </Text>
                    <TouchableOpacity
                      onPress={() => router.push('/eula')}
                      accessibilityLabel='End User License Agreement Button'
                      style={[styles.links, { marginBottom: 5 }]}
                    >
                      
                      <Text style={[styles.links, { color: theme.primary }]}>End User License Agreement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => router.push('/privacy-policy')}
                      accessibilityLabel='Privacy Policy Button'
                      style={styles.links}
                    >
                      <Text style={[styles.links, { color: theme.primary }]}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            auth.signOut();
                            //router.replace(ROUTES.ACCOUNT);
                        }}
                        accessibilityLabel='Sign Out Button'
                        style={[styles.signOut, { 
                          backgroundColor: theme.containerColor,
                          borderColor: theme.border,
                        }]}
                    >
                        <Text style={{
                          color: theme.error,
                          fontWeight: '600',
                          fontSize: 16,
                        }}>
                          Sign Out
                        </Text>
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
 