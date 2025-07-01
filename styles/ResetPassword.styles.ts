import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const ResetPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reset: {
        fontWeight: '500',
        fontSize: typography.body.fontSize,
        fontFamily: 'System',
        borderWidth: 0,
        backgroundColor: '#F2F2F7',
        borderColor: colors.text,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: 5,
        color: colors.text,
        alignSelf: 'center',
    },
    formContainer: {
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
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
        marginTop: spacing.sm,
        textAlign: 'left',
    },
    toggleText: {
        marginTop: 0,
        marginBottom: 0,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: typography.body.fontSize,
        fontFamily: 'System',
    },
    eye: {
        position: 'absolute',
        right: 10,
        top: 16,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 