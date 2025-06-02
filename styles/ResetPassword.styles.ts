import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const ResetPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        padding: spacing.md,
    },
    title: {
        fontSize: typography.h2.fontSize,
        fontWeight: 'bold' as const,
        marginBottom: spacing.lg,
    },
    input: {
        height: 40,
        borderColor: colors.border,
        borderWidth: 1,
        marginTop: spacing.sm,
        paddingLeft: spacing.sm,
    },
    errorText: {
        color: colors.error,
        fontSize: typography.caption.fontSize,
        marginBottom: spacing.sm,
        marginTop: spacing.xs,
    },
    message: {
        fontSize: typography.caption.fontSize,
        textAlign: 'left',
        color: colors.text,
        opacity: 0.7,
    },
    requirements: {
        fontSize: typography.caption.fontSize,
        color: colors.text,
        opacity: 0.7,
        marginBottom: 0,
        marginTop: spacing.lg,
        marginHorizontal: spacing.md,
        textAlign: 'center',
    },
    toggleText: {
        marginTop: 0,
        marginBottom: spacing.sm,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: '500',
    },
}); 