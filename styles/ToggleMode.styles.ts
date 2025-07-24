import { StyleSheet } from 'react-native';
import { colors, spacing } from './theme';

export const ToggleModeStyles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: spacing.md,
        padding: spacing.sm,
        borderRadius: 8,
        backgroundColor: 'transparent',
        gap: spacing.sm,
        paddingVertical: 12,
        paddingHorizontal: 24,
        minWidth: 140,
        marginBottom: 20,
    },

});