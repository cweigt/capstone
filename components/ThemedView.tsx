//this is not used anymore, we have changed the colors using a different method for the views

import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: 'lightColor', dark: 'white' }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
