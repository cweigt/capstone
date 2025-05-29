import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ImageContextType = {
  image: string | null;
  setImage: (image: string | null) => void;
};

const ImageContext = createContext<ImageContextType>({ image: null, setImage: () => {} });

export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState<string | null>(null);

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
  }, []);

  const updateImage = async (newImage: string | null) => {
    setImage(newImage);
    if (newImage) {
      await AsyncStorage.setItem('userImage', newImage);
    } else {
      await AsyncStorage.removeItem('userImage');
    }
  };

  return (
    <ImageContext.Provider value={{ image, setImage: updateImage }}>
      {children}
    </ImageContext.Provider>
  );
}; 