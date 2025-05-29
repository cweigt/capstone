import { 
    StyleSheet, 
    View, 
    Text,
    Image,
    TextInput,
    Button 
} from 'react-native';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import React, { useState } from 'react';
import { 
    getAuth,
    updateProfile,
 } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import UploadImage from '@/components/UploadImage';

const Settings = () => {
  const auth = getAuth();
  const database = getDatabase();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const changeName = async() => {
    try {
      if (!firstName.trim() || !lastName.trim()) {
        alert('Please enter both first and last name');
        return;
      }
      
      //Update Authentication profile
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`
      });

      //Update Realtime Database
      await set(ref(database, `users/${auth.currentUser.uid}`), {
        firstName: firstName,
        lastName: lastName,
      });
      
      alert('Name updated successfully!');
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update name. Please try again.');
    }
  };

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
      <View style={styles.container}>
        <Text style={styles.title}>
          Settings
        </Text>
        <View>
            <TextInput
                style={styles.input}
                placeholder="Change first name..."
                placeholderTextColor='#000000'
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Change last name..."
                placeholderTextColor='#000000'
                value={lastName}
                onChangeText={setLastName}
            />
            <Button
                title="Save changes"
                onPress={() => changeName()}
            />
            <UploadImage />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
   container: {
    padding: 16,
   },
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
   },
  auroraLogo: {
    marginTop: 1,
    marginLeft: 33,
    height: 175,
    width: 330,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 8,
},
});

export default Settings;
