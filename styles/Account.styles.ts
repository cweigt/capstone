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
    title: {
        fontSize: typography.h2.fontSize,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: spacing.md,
        marginTop: spacing.sm,
        marginLeft: spacing.md,
    },
    welcomeText: {
        fontSize: typography.h1.fontSize,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: spacing.md,
        marginTop: spacing.sm,
        marginLeft: spacing.sm,
        marginRight: spacing.sm,
    },
    links: {
        color: '#007AFF', 
        fontSize: 16,
        marginLeft: spacing.sm,
    },
    signOut: {
        color: '#007AFF', 
        fontWeight: '600',
        fontSize: 22,
        fontFamily: 'System'
    },
    savedArticles: {
        marginTop: spacing.md,
        marginBottom: 0,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'System',
    },
}); 