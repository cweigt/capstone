import { StyleSheet } from 'react-native';
import { colors, spacing } from './theme';

export const UploadImageStyles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: spacing.xs,
        marginTop: spacing.sm,
        padding: spacing.sm,
        backgroundColor: colors.border,
        borderRadius: 5,
    },
    uploadText: {
        color: colors.text,
    },
}); 