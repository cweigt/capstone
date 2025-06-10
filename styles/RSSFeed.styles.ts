import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography } from './theme';

export const RSSFeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  dropdownContainer: {
    width: '100%',
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    // iOS shadow
    ...Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      // Android shadow
      android: {
        elevation: 5,
      },
    }),
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 120,
    paddingTop: 80,
    flex: 1,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.primary,
  },
  headerText: {
    fontSize: typography.h1.fontSize,
    fontWeight: 'bold' as const,
    color: colors.background,
  },
  dropdown: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background,
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.background,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  starButton: {
    padding: 8,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  date: {
    fontSize: typography.caption.fontSize,
    color: colors.text,
    opacity: 0.7,
  },
  description: {
    fontSize: typography.body.fontSize,
    color: colors.text,
    opacity: 0.8,
    marginVertical: spacing.sm,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  message: {
    fontSize: typography.body.fontSize,
    textAlign: 'left',
    marginTop: spacing.lg,
    color: colors.text,
    opacity: 0.7,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 10,
  },
}); 