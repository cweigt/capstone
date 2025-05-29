import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

type ImageContextType = {
  image: string | null;
  setImage: (image: string | null) => void;
};

const ImageContext = createContext<ImageContextType>({ image: null, setImage: () => {} });

export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState<string | null>(null);
  const auth = getAuth();
  const database = getDatabase();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set initial image from auth profile
        if (user.photoURL) {
          setImage(user.photoURL);
        }
      } else {
        setImage(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen for database changes when user is logged in
  useEffect(() => {
    if (!auth.currentUser) return;

    const userRef = ref(database, `users/${auth.currentUser.uid}/photoURL`);
    const unsubscribeDB = onValue(userRef, (snapshot) => {
      const photoURL = snapshot.val();
      if (photoURL) {
        setImage(photoURL);
      }
    });

    return () => unsubscribeDB();
  }, [auth.currentUser?.uid]);

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
}; 