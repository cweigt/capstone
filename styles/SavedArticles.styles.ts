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
        borderRadius: spacing.sm,
        marginBottom: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.background,
    },
    cardTitle: {
        fontSize: typography.body.fontSize,
        fontWeight: '600',
        marginBottom: spacing.sm,
    },
    date: {
        color: colors.text,
        fontSize: typography.caption.fontSize,
        marginLeft: 'auto',
    },
    description: {
        fontSize: typography.regular.fontSize,
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
        fontSize: typography.regular.fontSize,
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