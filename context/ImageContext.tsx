import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, get } from 'firebase/database';

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
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.uid);
      if (user) {
        // Check database first for base64 image data
        try {
          const userRef = ref(database, `users/${user.uid}/photoURL`);
          const snapshot = await get(userRef);
          const photoURL = snapshot.val();
          console.log('Database photoURL:', photoURL ? photoURL.substring(0, 50) + '...' : 'null');
          if (photoURL && photoURL.startsWith('data:')) {
            // This is a base64 data URL from our app
            setImage(photoURL);
            console.log('Set image from database base64 data');
          } else if (user.photoURL && !user.photoURL.startsWith('data:')) {
            // This is a regular URL from Firebase Auth (legacy)
            setImage(user.photoURL);
            console.log('Set image from auth profile (legacy)');
          }
        } catch (error) {
          console.error('Error fetching photo from database:', error);
          // Fallback to auth profile if database fails
          if (user.photoURL) {
            setImage(user.photoURL);
          }
        }
      } else {
        console.log('User logged out, clearing image');
        setImage(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen for database changes when user is logged in
  useEffect(() => {
    if (!auth.currentUser) return;

    console.log('Setting up database listener for user:', auth.currentUser.uid);
    const userRef = ref(database, `users/${auth.currentUser.uid}/photoURL`);
    const unsubscribeDB = onValue(userRef, (snapshot) => {
      const photoURL = snapshot.val();
      console.log('Database photoURL changed:', photoURL ? photoURL.substring(0, 50) + '...' : 'null');
      if (photoURL && photoURL.startsWith('data:')) {
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