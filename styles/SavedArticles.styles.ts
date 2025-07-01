import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';
//this is shared between both privacy-policy and eula

export const SavedArticlesStyles = StyleSheet.create({
    title: {
        fontSize: typography.h2.fontSize,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: spacing.md,
        marginTop: spacing.sm,
        marginLeft: spacing.sm,
        marginRight: spacing.sm,
        color: colors.text,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
      },
    card: {
        borderRadius: 8,
        marginBottom: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.background,
    },
    cardTitle: {
        fontSize: typography.body.fontSize,
        fontWeight: '600',
        marginBottom: 8,
    },
    date: {
        color: colors.text,
        fontSize: 12,
        marginLeft: 'auto',
    },
    description: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    starContainer: {
        alignItems: 'center',
        marginTop: -spacing.lg,
        marginLeft: spacing.md,
    },
    starButton: {
        padding: 4,
        minWidth: spacing.xl,
        minHeight: spacing.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    message: {
        fontSize: spacing.md,
        color: colors.text,
        textAlign: 'center',
        marginTop: 20,
    },
    divider: {
        borderBottomWidth: 1, 
        borderBottomColor: '#E0E0E0', 
        marginBottom: spacing.xs,
        marginHorizontal: -20,
    },
}); 