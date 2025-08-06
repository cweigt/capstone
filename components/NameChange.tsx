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
import { ResetPasswordStyles as resetStyles } from '@/styles/ResetPassword.styles';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const Name_Change = () => {
  const auth = getAuth();
  const database = getDatabase();
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showNameChange, setShowNameChange] = useState(false);
  
  //get current first and last name from display name
  //this is so it can be displayed into the name fields for name change
  const currentFirstName = user?.displayName?.split(' ')[0] || '';
  const currentLastName = user?.displayName?.split(' ')[1] || '';
  
  const changeName = async() => {
    try {
      if (!firstName.trim() || !lastName.trim()) {
        alert('Please enter both first and last name');
        return;
      }
      
      const displayName = `${firstName} ${lastName}`;
      
      //update Authentication profile when user clicks "save name"
      await updateProfile(auth.currentUser, {
        displayName: displayName //John Smith
      });

      //reload user to get updated profile
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      setUser({ ...updatedUser}); //forcing re render using spread operator

      //update Realtime Database - only update name fields
      //all the other fields remain because of th e UID access, was a bug that needed fixing
      await update(ref(database, `users/${auth.currentUser.uid}`), {
        firstName: firstName, //John
        lastName: lastName, //Smith
        displayName: displayName //John Smith
      });

      //clearing out the fields and replacing the with the name placeholders
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update name. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.formContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.requirements, { color: theme.text }]}>
                First Name
            </Text>
            <TextInput
                style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                placeholder={currentFirstName}
                placeholderTextColor={theme.gray}
                value={firstName}
                onChangeText={setFirstName}
                accessibilityLabel="First name"
                accessibilityHint="Enter your first name"
            />
            <Text style={[styles.requirements, {paddingTop: 10, color: theme.text }]}>
                Last Name
            </Text>
            <TextInput
                style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                placeholder={currentLastName}
                placeholderTextColor={theme.gray}
                value={lastName}
                onChangeText={setLastName}
                accessibilityLabel="Last name"
                accessibilityHint="Enter your last name"
            />
            <View style={{ paddingBottom: 20 }}></View>
            <TouchableOpacity
              onPress={changeName}
              accessibilityLabel='Save Name Button'
              style={[resetStyles.reset, { backgroundColor: theme.containerColor, borderColor: theme.border }]}
            >
              <Text style={[resetStyles.toggleText, { color: theme.text }]} allowFontScaling={true}>
                Save Name
              </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

export default Name_Change;

