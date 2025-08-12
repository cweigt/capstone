/* 
  @component: DisplayImage
  @description: handles the image display for a profile photo

  @example
  <DisplayImage/>
*/

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
  //this displayImage shows the image that the imageContext finds
  const { theme } = useTheme();
  
  if (!image) {
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