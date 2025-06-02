import { StyleSheet } from 'react-native';
import { colors, typography } from './theme';

export const ThemedTextStyles = StyleSheet.create({
    default: {
        fontSize: typography.body.fontSize,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: typography.body.fontSize,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: typography.h1.fontSize,
        fontWeight: 'bold' as const,
        lineHeight: 32,
    },
    subtitle: {
        fontSize: typography.h2.fontSize,
        fontWeight: 'bold' as const,
    },
    link: {
        lineHeight: 30,
        fontSize: typography.body.fontSize,
        color: colors.primary,
    },
}); 