import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';
//this is shared between both privacy-policy and eula

export const ProfileStyles = StyleSheet.create({
    back: {
        color: '#007AFF', 
        fontSize: typography.body.fontSize,
    },
    title: {
        fontSize: typography.h3.fontSize,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: spacing.sm,
        marginLeft: spacing.md,
        marginBottom: spacing.md,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
    divider: {
        borderBottomWidth: 1, 
        borderBottomColor: '#E0E0E0', 
        marginBottom: 20,
        marginHorizontal: -20,
    },
}); 