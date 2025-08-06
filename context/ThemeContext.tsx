//this setup fetches the system ligthing preference initially
//also allows for manual changing of lighting, just need to add UI for that

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '@/styles/theme';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, onValue } from 'firebase/database';

type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  mode: 'light' | 'dark'; //determining the two modes 
  setMode: (mode: 'light' | 'dark') => void; //mode is either light or dark 
  isManualOverride: boolean; //useful for user preference of the mode
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  mode: 'light', 
  setMode: () => {},
  isManualOverride: false,
});

const THEME_PREFERENCE_KEY = '@theme_preference';
const MANUAL_OVERRIDE_KEY = '@manual_override';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  //allows the mode to be switched based on the system colors on initial load
  const [mode, setMode] = useState<'light' | 'dark'>(systemColorScheme === 'dark' ? 'dark' : 'light');
  //manual override only activates when you hit the switch button the first time
  const [isManualOverride, setIsManualOverride] = useState(false);
  //currentUser is used to track who is logged in to store their preference state
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const auth = getAuth();
  const database = getDatabase();

  //listen for auth state changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user?.uid || null);
    });

    return () => unsubscribeAuth();
  }, []);

  //load saved theme preference on app start
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        if (currentUser) {
          // User is logged in - load from database
          const userRef = ref(database, `users/${currentUser}/themePreference`);
          const snapshot = await get(userRef);
          const savedTheme = snapshot.val();
          
          if (savedTheme && savedTheme.mode) {
            setMode(savedTheme.mode);
            setIsManualOverride(savedTheme.isManualOverride || false);
          } else {
            // No saved preference, use system preference
            setMode(systemColorScheme === 'dark' ? 'dark' : 'light');
            setIsManualOverride(false);
          }
        } else {
          //no user logged in - use system preference
          //this does mean that if you chose light mode and you log out, the sign in page is 
            //the one that matches your system, so it could be dark
          setMode(systemColorScheme === 'dark' ? 'dark' : 'light');
          setIsManualOverride(false);
        }
      } catch (error) {
        console.log('Error loading theme preference:', error);
        // Fallback to system preference
        if (systemColorScheme) {
          setMode(systemColorScheme === 'dark' ? 'dark' : 'light');
          setIsManualOverride(false);
        }
      }
    };

    loadSavedTheme();
  }, [systemColorScheme, currentUser]); //checks everytime system color changes or user changes

  // Listen for theme changes in database when user is logged in
  useEffect(() => {
    if (!currentUser) return;

    const userRef = ref(database, `users/${currentUser}/themePreference`);
    const unsubscribeDB = onValue(userRef, (snapshot) => {
      const savedTheme = snapshot.val();
      if (savedTheme && savedTheme.mode) {
        setMode(savedTheme.mode);
        setIsManualOverride(savedTheme.isManualOverride || false);
      }
    });

    return () => unsubscribeDB();
  }, [currentUser]);

  // Save theme preference when manually changed
  const setManualMode = async (newMode: 'light' | 'dark') => {
    try {
      if (currentUser) {
        //user is logged in - save to database
        const userRef = ref(database, `users/${currentUser}/themePreference`);
        await set(userRef, {
          //saving the mode, manual override state, and date updated 
          mode: newMode,
          isManualOverride: true,
          updatedAt: new Date().toISOString()
        });
      } else {
        //no user logged in - save to AsyncStorage (fallback)
        //just in case Firebase doesn't work, AsyncStorage will take over, although that has it's own 
          //problems if multiple people use the same device
        //*this fallback has never been used
        await AsyncStorage.setItem(THEME_PREFERENCE_KEY, newMode);
        await AsyncStorage.setItem(MANUAL_OVERRIDE_KEY, 'true');
      }
      
      setMode(newMode);
      setIsManualOverride(true);
    } catch (error) {
      console.log('Error saving theme preference:', error);
      //still update local state even if save fails
      setMode(newMode);
      setIsManualOverride(true);
    }
  };

  //update to system preference if not manually overridden
  useEffect(() => {
    if (!isManualOverride && systemColorScheme) {
      setMode(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [systemColorScheme, isManualOverride]);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode: setManualMode, isManualOverride }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
