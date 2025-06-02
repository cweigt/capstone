import React from 'react';
import { 
    Image, 
    View, 
    Platform, 
    TouchableOpacity, 
    Text, 
    StyleSheet,
    Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DisplayImage from '@/components/DisplayImage';
import { useImage } from '@/context/ImageContext';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

//this component includes a call to the other component for the image
//also includes the logic and rendering for the Edit Image thing and Image Picker
//allows user to change their image
//"fuller functionality"
const UploadImage = () => {
  const { image, setImage } = useImage();
  const auth = getAuth();
  const database = getDatabase();

  const addImage = async () => {
    try {
      const profile = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      });
      
      if (!profile.canceled) {
        const imageUri = profile.assets[0].uri;
        
        // First update Firebase Auth profile
        await updateProfile(auth.currentUser, {
          photoURL: imageUri
        });
        
        // Then update Realtime Database
        await set(ref(database, `users/${auth.currentUser.uid}/photoURL`), imageUri);
        
        // Finally update local state
        setImage(imageUri);
      
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile image. Please try again.');
    }
  };

  return (
    <View style={{ alignSelf: 'center', alignItems: 'center' }}>
        <DisplayImage />
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
            <Text style={{ color: 'black' }}>{image ? 'Edit' : 'Upload'} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
    </View>
  );
}

const imageUploaderStyles=StyleSheet.create({
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
        flexDirection: 'row',
        gap: 5,
        marginTop: 10,
        padding: 8,
        backgroundColor: 'lightgrey',
        borderRadius: 5
    }
});

export default UploadImage;