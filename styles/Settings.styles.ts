import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const SettingsStyles = StyleSheet.create({
    container: {
        padding: spacing.md,
    },
    title: {
        fontSize: typography.h2.fontSize,
        fontWeight: 'bold' as const,
        marginBottom: spacing.md,
    },
    auroraLogo: {
        marginTop: 1,
        marginLeft: 33,
        height: 175,
        width: 330,
        resizeMode: 'contain',
    },
    input: {
        height: 40,
        borderColor: colors.border,
        borderWidth: 1,
        marginTop: spacing.sm,
        paddingLeft: spacing.sm,
    },
}); 