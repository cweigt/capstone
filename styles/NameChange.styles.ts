import { StyleSheet } from 'react-native';
import { colors, commonStyles, spacing, typography } from './theme';

export const NameChangeStyles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontWeight: '500',
        fontSize: typography.body.fontSize,
        fontFamily: 'System',
        backgroundColor: colors.backgroundColor,
        borderColor: colors.text,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: 5,
        color: colors.text,
        alignSelf: 'center',
    },
    save: {
        backgroundColor: colors.backgroundColor,
        paddingVertical: typography.caption.fontSize,
        paddingHorizontal: spacing.xl,
        borderRadius: spacing.sm,
        alignItems: 'center',
        alignSelf: 'center',
    },
}); 