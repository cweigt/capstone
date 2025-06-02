import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export const CollapsibleStyles = StyleSheet.create({
    container: {
        marginVertical: spacing.xs,
        borderRadius: 5,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.border,
    },
    title: {
        fontSize: typography.body.fontSize,
        fontWeight: 'bold' as const,
    },
    icon: {
        fontSize: typography.caption.fontSize,
    },
    content: {
        overflow: 'hidden',
    },
}); 