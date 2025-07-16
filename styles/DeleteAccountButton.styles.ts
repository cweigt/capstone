import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const DeleteAccountButtonStyles = StyleSheet.create({
    errorMessage: {
        color: 'red', 
        marginBottom: spacing.sm,
    },
    deleteAccount: {
        fontWeight: '500',
        fontSize: typography.body.fontSize,
        fontFamily: 'System',
        borderWidth: 0,
        backgroundColor: colors.containerColor,
        borderColor: colors.text,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: 5,
        color: colors.error,
    },
    deleteButton: {
        color: 'red', 
        fontWeight: 'bold',
    },
    bkgContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        backgroundColor: 'white', 
        padding: 24, 
        borderRadius: 8, 
        width: '80%'
    },
    passwordTitle: {
        fontWeight: 'bold', 
        fontSize: 18, 
        marginBottom: 12,
    },
    modalInput: {
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: spacing.xs, 
        padding: spacing.sm, 
        marginBottom: 12,
    },
    eye: {
        position: 'absolute',
        right: spacing.xs,
        top: spacing.xs,
        padding: spacing.xs,
    },
}); 