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
  const database = getDatabase();

  const addImage = async () => {
    try {
      console.log('Starting image upload process...');
      const profile = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true
      });
      
      if (!profile.canceled) {
        const imageUri = profile.assets[0].uri;
        const base64Data = profile.assets[0].base64;
        
        console.log('Image selected, URI length:', imageUri.length);
        console.log('Base64 data length:', base64Data ? base64Data.length : 'null');
        
        // Create data URL for the image
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;
        console.log('Data URL created, length:', dataUrl.length);
        
        // Only update Realtime Database (not Firebase Auth due to length limits)
        console.log('Updating Realtime Database...');
        await set(ref(database, `users/${auth.currentUser.uid}/photoURL`), dataUrl);
        console.log('Realtime Database updated');
        
        // Update local state
        console.log('Updating local state...');
        setImage(dataUrl);
        console.log('Image upload complete');
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
                <DisplayImage />
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