import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const searchStyles = StyleSheet.create({
    container: {
      paddingTop: spacing.xl,
      backgroundColor: colors.background,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: spacing.sm,
      marginTop: 40,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: spacing.lg,
      paddingHorizontal: 10,
      marginBottom: spacing.md,
      height: 40,
      width: '93.5%',
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
  });