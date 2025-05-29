import React, { useEffect } from 'react';
import { 
    Image, 
    View, 
    Platform, 
    TouchableOpacity, 
    Text, 
    StyleSheet 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayImage from '@/components/DisplayImage';

//this component includes a call to the other component for the image
//also includes the logic and rendering for the Edit Image thing and Image Picker
//allows user to change their image
//"fuller functionality"
const UploadImage = ({ image, setImage }) => {

  const addImage = async () => {
    const profile = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
    });
    
    if (!profile.canceled) {
      const imageUri = profile.assets[0].uri;
      setImage(imageUri);
      await AsyncStorage.setItem('userImage', imageUri);
    }
  };

  return (
    <View style={{ alignSelf: 'center', alignItems: 'center' }}>
        <DisplayImage image={image} setImage={setImage} />
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