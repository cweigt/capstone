import { 
    View, 
    Text,
    TextInput,
    Button,
    TouchableOpacity, 
} from 'react-native';
import React, { useState } from 'react';
import { 
    getAuth,
    updateProfile,
} from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';
import { NameChangeStyles as styles } from '@/styles/NameChange.styles';
import { useAuth } from '@/context/AuthContext';

const Name_Change = () => {
  const auth = getAuth();
  const database = getDatabase();
  const { user, setUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showNameChange, setShowNameChange] = useState(false);
  
  //Get current first and last name from display name
  const currentFirstName = user?.displayName?.split(' ')[0] || '';
  const currentLastName = user?.displayName?.split(' ')[1] || '';
  
  const changeName = async() => {
    try {
      if (!firstName.trim() || !lastName.trim()) {
        alert('Please enter both first and last name');
        return;
      }
      
      const displayName = `${firstName} ${lastName}`;
      
      //Update Authentication profile
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });

      // Reload user to get updated profile
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      setUser({ ...updatedUser}); //forcing re render

      //Update Realtime Database - only update name fields
      await update(ref(database, `users/${auth.currentUser.uid}`), {
        firstName: firstName,
        lastName: lastName,
        displayName: displayName
      });

      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update name. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
        <View style={{ backgroundColor: 'white' }}>
            <View style={styles.formContainer}>
                <Text style={styles.requirements}>
                    First Name
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={currentFirstName}
                    placeholderTextColor='#000000'
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <Text style={[styles.requirements, {paddingTop: 10 }]}>
                    Last Name
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={currentLastName}
                    placeholderTextColor='#000000'
                    value={lastName}
                    onChangeText={setLastName}
                />
                <View style={{ paddingBottom: 20 }}></View>
                <TouchableOpacity
                  onPress={changeName}
                >
                  <Text style={styles.toggleText}>
                    Save Name
                  </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

export default Name_Change;

