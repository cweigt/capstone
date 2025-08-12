/*
  @component: ToggleMode
  @description: used to change from light mode to dark mode

  @example… from app/(tabs)/account/index.tsx
  <ToggleMode/>
*/

import React from 'react';
import { ToggleModeStyles as styles } from '@/styles/ToggleMode.styles';
import { useTheme } from '@/context/ThemeContext';
import { 
    TouchableOpacity,
    Text,
 } from 'react-native';
import { IconSymbol } from './ui/IconSymbol.ios';

//allows the user to manually change the theme as well if they don't want the system to do it
//this component is rendered in the account page 
const ToggleMode = () => {
    const  { mode, setMode, theme } = useTheme();

    //toggling the theme when the user will click the button
    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    //the button that will toggle the theme
    return (
        <TouchableOpacity 
            onPress={toggleTheme} 
            style={[styles.button, { backgroundColor: theme.containerColor, borderColor: theme.border }]}
        >
            <Text style={{color: theme.text}}>
                Switch to {mode === 'dark' ? "light mode" : "dark mode"}
            </Text>
            <IconSymbol 
                name={mode === 'dark' ? 'sun.max' : 'moon'} 
                size={24} 
                color={mode === 'dark' ? '#FFD700' : theme.primary}
            />
        </TouchableOpacity>
    );
};

export default ToggleMode;