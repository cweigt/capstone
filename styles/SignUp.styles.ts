import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const SignUpStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        padding: spacing.md,
    },
    title: {
        fontSize: typography.h3.fontSize,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: spacing.sm,
        marginBottom: spacing.md,
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
        marginTop: spacing.sm,

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
    reset: {
        //backgroundColor: '#F2F2F7',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'center',
        minWidth: 140,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    toggleText: {
        marginTop: 0,
        marginBottom: spacing.sm,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: '500',
    },
    signUpButton: {
        backgroundColor: '#F2F2F7',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'center',
        minWidth: 140,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#000000',
        fontWeight: '500',
        fontSize: 16,
    },
}); 