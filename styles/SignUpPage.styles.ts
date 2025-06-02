import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const SignUpPageStyles = StyleSheet.create({
    auroraLogo: {
        marginTop: 1,
        marginLeft: 33,
        height: 175,
        width: 330,
        resizeMode: 'contain',
    },
    toggleText: {
        marginTop: 0,
        marginBottom: spacing.sm,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: '500',
    },
    welcomeText: {
        fontSize: typography.h2.fontSize,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: spacing.md,
        marginTop: spacing.sm,
    },
}); 