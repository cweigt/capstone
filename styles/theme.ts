import { StyleSheet } from 'react-native';

export const lightTheme = {
  primary: '#007AFF', //active tint 
  secondary: '#5856D6',
  background: '#FFFFFF', //tab bar bkg
  text: '#000000', //inactive tint
  border: '#E5E5EA',
  error: '#FF3B30',
  success: '#34C759',
  accentBlue: 'blue',
  saveIconActive: '#FFD700',
  gray: '#888888',
  containerColor: '#F2F2F7',
  backgroundColor: '#F2F2F7' ,
  shadowColor: '#F2F2F7',
};

export const darkTheme ={
  primary: '#0A84FF',       // brighter blue for dark mode
  secondary: '#5E5CE6',     // slightly lighter than original to pop on dark
  background: '#1C1C1E',    // main background (dark gray, not pure black)
  text: '#FFFFFF',          // readable on dark
  border: '#3A3A3C',        // subtle border color for dark backgrounds
  error: '#FF453A',         // Apple-style dark mode error red
  success: '#30D158',       // vivid green that pops on dark
  accentBlue: '#64AFFF',    // softer blue for accents
  saveIconActive: '#FFD700',// gold still pops well on dark
  gray: '#A1A1A1',          // lighter gray for contrast
  containerColor: '#2C2C2E',// darker "container" background
  backgroundColor: '#2C2C2E',
  shadowColor: '#2C2C2E',
};

export const spacing = {
  xs: 4, //these are spacing theme tokens
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 13,
  },
  caption: {
    fontSize: 11, //label font size
  },
  regular: {
    fontSize: 12,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: theme.containerColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    //shadowColor: theme.containerColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  card:{
    borderRadius: 8,

  },
});