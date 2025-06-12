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
                <TouchableOpacity onPress={() => setShowNameChange(!showNameChange)}>
                    <Text style={styles.toggleText}>
                        {showNameChange ? 'Hide' : 'Show'} Name Change Form
                    </Text>
                </TouchableOpacity>
                {showNameChange && (
                    <>
                        <Text style={styles.requirements}>
                            Change your name by entering your new name.
                        </Text>
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
                            title="Save name"
                            onPress={() => changeName()}
                        />
                    </>
                )}
            </View>
        </View>
    </View>
  );
}

export default Name_Change;

