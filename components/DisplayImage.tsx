import React from 'react';
import { 
    Image, 
    View
} from 'react-native';
import { useImage } from '@/context/ImageContext';
import { DisplayImageStyles as styles } from '../styles/DisplayImage.styles';

//this component contains the logic and rendering for the image itself
//also includes persistence
//"partial functionality"
const DisplayImage = () => {
  const { image } = useImage();
  
  return (
    <View style={styles.container}>
        <Image 
          source={{ uri: image }} 
          style={styles.image}
        />
    </View>
  );
}

export default DisplayImage; 