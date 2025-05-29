import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { 
    Image, 
    View, 
    StyleSheet 
} from 'react-native';

//this component contains the logic and rendering for the image itself
//also includes persistence
//"partial functionality"
const DisplayImage = ({ image, setImage }) => {

  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('userImage');
        if (savedImage) {
          setImage(savedImage);
        }
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };
    loadImage();
  }, [image]);
  
  return (
    <View style={[imageStyles.container, { alignSelf: 'center' }]}>
        {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
    </View>
  );
}

const imageStyles = StyleSheet.create({
  container:{
    elevation:2,
    height:150,
    width:150,
    backgroundColor:'#efefef',
    position:'relative',
    borderRadius:999,
    overflow:'hidden',
    marginVertical: 10,
  },
});

export default DisplayImage; 