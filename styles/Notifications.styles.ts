import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const NotificationsStyles = StyleSheet.create({
    auroraLogo: {
        marginTop: 1,
        marginLeft: 33,
        height: 175,
        width: 330,
        resizeMode: 'contain',
    },
    container: {
        padding: spacing.md,
    },
    title: {
        fontSize: typography.h2.fontSize,
        fontWeight: 'bold' as const,
        marginBottom: spacing.md,
    },
    message: {
        fontSize: typography.body.fontSize,
        textAlign: 'left',
        marginTop: spacing.lg,
        color: colors.text,
        opacity: 0.7,
    },
}); 