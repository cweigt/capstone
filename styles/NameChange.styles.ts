import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const NameChangeStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    formContainer: {
        paddingTop: spacing.sm,
        paddingHorizontal: spacing.md,
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
        marginTop: spacing.sm, //for some reason, this is actually md
        textAlign: 'left',
    },
    toggleText: {
        marginTop: 0,
        marginBottom: 0,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'System',
    },
}); 