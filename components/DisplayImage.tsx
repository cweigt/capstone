import React from 'react';
import { 
    Image, 
    View, 
    StyleSheet 
} from 'react-native';
import { useImage } from '@/context/ImageContext';

//this component contains the logic and rendering for the image itself
//also includes persistence
//"partial functionality"
const DisplayImage = () => {
  const { image } = useImage();
  
  return (
    <View style={[imageStyles.container, { alignSelf: 'center' }]}>
        <Image 
          source={{ uri: image }} 
          style={{ width: 150, height: 150 }} 
        />
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