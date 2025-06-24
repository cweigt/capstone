import { StyleSheet } from 'react-native';

export const colors = {
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
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12, //label font size
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
    shadowColor: '#F2F2F7',
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