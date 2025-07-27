import React from 'react';
import { 
    Image, 
    View,
    Text
} from 'react-native';
import { useImage } from '@/context/ImageContext';
import { DisplayImageStyles as styles } from '../styles/DisplayImage.styles';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

//this component contains the logic and rendering for the image itself
//also includes persistence
//"partial functionality"
const DisplayImage = () => {
  const { image } = useImage();
  const { theme } = useTheme();
  
  console.log('DisplayImage - image value:', image ? 'has image' : 'no image');
  
  if (!image) {
    console.log('DisplayImage - showing placeholder');
    return (
      <View style={[styles.container, { backgroundColor: theme.border }]}>
        <Ionicons 
          name="person" 
          size={40} 
          color={theme.gray} 
        />
      </View>
    );
  }
  
  console.log('DisplayImage - showing image with URI');
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