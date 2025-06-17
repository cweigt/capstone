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
        //marginTop: spacing.sm,
        padding: spacing.sm,
        backgroundColor: '#F2F2F7',
        borderRadius: 5,
        marginLeft: 15, 
        marginTop: 40,
    },
    uploadText: {
        color: colors.text,
    },
    row: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
    },
}); 