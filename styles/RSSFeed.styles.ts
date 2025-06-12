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
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
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
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  starContainer: {
    alignItems: 'center',
    marginTop: -24,
    marginLeft: 16,
  },
  starButton: {
    padding: 4,
    minWidth: 32,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
    marginLeft: 'auto',
  },
  description: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    marginVertical: 8,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  message: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 