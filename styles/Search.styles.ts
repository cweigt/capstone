import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const searchStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      width: '100%',
      padding: spacing.sm,
      marginBottom: 13,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: spacing.lg,
      paddingHorizontal: 10,
      height: 40,
    },
    input: {
      flex: 1,
      fontSize: typography.body.fontSize,
      color: colors.text,
    },
    result: {
      padding: 10,
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
    },
    empty: {
      textAlign: 'center',
      color: colors.gray,
      marginTop: 20,
    },
    divider: {
      borderBottomWidth: 1, 
      borderBottomColor: '#E0E0E0', 
    },
    animation: {
      width: '100%',
      backgroundColor: colors.background,
      zIndex: 100,
      position: 'absolute',
      top: 0,
      left: 0,
    }
  });