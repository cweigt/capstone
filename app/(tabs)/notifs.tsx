import { 
  StyleSheet, 
  View, 
  Text, 
  Image 
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
//import { auth } from '@/firebase';

const Notifications = () => {
  const [user, setUser] = useState(null);

  //this listens for the user to be changed and then will change display
  //in this case it's better than passing user in as prop… will cause issues
  /*useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      setUser(user)
    });
    return () => listener();
  }, []);*/


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }}
      headerImage={
        <Image
          source={require('@/assets/images/aurora-wdc.png')}
          style={styles.auroraLogo}
        />
      }
    > {/*end of opening ParallaxScrollView*/}
      {user ? (
        <View style={styles.container}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.message}>You don't have any notifications yet.</Text>
        </View>
      ) : (
        <View style={styles.container}>
            <Text style={styles.message}>Please sign in to view notifications.</Text>
        </View>
      )};
      
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