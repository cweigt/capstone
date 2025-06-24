import { StyleSheet } from 'react-native';
import { colors, spacing } from './theme';

export const DisplayImageStyles = StyleSheet.create({
    container: {
        elevation: 2,
        height: 100,
        width: 100,
        backgroundColor: colors.border,
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
        marginVertical: spacing.sm,
        alignSelf: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
}); 