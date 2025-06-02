import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography, commonStyles } from './theme';

export const RSSFeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    marginTop: 70,
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
  dropdownContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
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
  dropdown: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
  },
  listContent: {
    paddingBottom: 80,
    flex: 1,
  },
  card: {
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: 'bold' as const,
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
    textDecorationLine: 'underline',
    fontSize: typography.body.fontSize,
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
  },
}); 