import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
const useColorScheme = ({ light, dark}: {light: string, dark: string}, colorName: string) => {
  const colorScheme = useRNColorScheme();

  //always defaulting to light color
  if(colorScheme === 'dark' || colorScheme === 'light'){
    return 'light';
  }

}

export default useColorScheme;