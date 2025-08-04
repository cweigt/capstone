import React from 'react';
import { 
    Image, 
    View, 
    Platform, 
    TouchableOpacity, 
    Text, 
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DisplayImage from '@/components/DisplayImage';
import { useImage } from '@/context/ImageContext';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { UploadImageStyles as styles } from '../styles/UploadImage.styles';
import { ResetPasswordStyles as resetStyles } from '@/styles/ResetPassword.styles';
import { useTheme } from '@/context/ThemeContext';

//this component includes a call to the other component for the image
//also includes the logic and rendering for the Edit Image thing and Image Picker
//allows user to change their image
//"fuller functionality"
const UploadImage = () => {
  const { theme } = useTheme();
  const { image, setImage } = useImage();
  const auth = getAuth();
  const database = getDatabase(); //stores this in database so that it can be fetched across all devices for a user

  const addImage = async () => {
    try {
      //base64 allows this to be displayed on the profile because of the size… mitigates errors on the image
      const profile = await ImagePicker.launchImageLibraryAsync({
        //controls the image picker screen that shows up
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true
      });
      
      if (!profile.canceled) {
        const imageUri = profile.assets[0].uri;
        const base64Data = profile.assets[0].base64;
        
        //create data URL for the image
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;
        
        //only update Realtime Database (not Firebase Auth due to length limits)
        //storing the image in the database
        await set(ref(database, `users/${auth.currentUser.uid}/photoURL`), dataUrl);
      
        //update local state
        //once pulled from database, it is set in the user's environment
        setImage(dataUrl);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile image. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.row}>
            <View style={{ width: 100, height: 125 }}>
                <DisplayImage /> {/*calls this component to render the image*/}
            </View>
            <TouchableOpacity 
              onPress={addImage} 
              style={[resetStyles.reset, { backgroundColor: theme.containerColor, borderColor: theme.border, margin: 10 }]}
            >
                <Text style={[styles.uploadText, { color: theme.text }]}>Change Profile Photo</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

export default UploadImage;