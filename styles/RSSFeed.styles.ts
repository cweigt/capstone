import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography, commonStyles, } from './theme';

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
  
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,

  },

  listContentContainer: {
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
    borderRadius: commonStyles.card.borderRadius,
    shadowColor: commonStyles.shadow.shadowColor,
    shadowOffset: commonStyles.shadow.shadowOffset,

    //marginBottom: 16,
    //padding: 16,
    //backgroundColor: colors.background,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
    //paddingRight: 8,
  },
  cardSource:{
    fontSize: typography.caption.fontSize,
    color: colors.secondary,

  },
  cardTitle: {
    fontSize: typography.h1.fontSize,
    fontWeight: '600',
    marginBottom: spacing.sm,
    //flex: 1,
    //marginRight: 16,
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
    color: '#FFD700',
  },
  cardDate: {
    fontSize: typography.caption.fontSize,
    color: colors.secondary,
    //opacity: 0.7,
    //marginLeft: 'auto',
  },
  cardDescription: {
    fontSize: typography.body.fontSize,
    color: colors.secondary,
    //opacity: 0.8,
    //marginVertical: 8,
    marginBottom: spacing.sm,
  },
  link: {
    color: colors.primary,
    fontSize: typography.body.fontSize,
    fontWeight: '500',
  },
  message: {
    fontSize: typography.body.fontSize,
    color: colors.text,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer:{
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    shadowColor: commonStyles.shadow.shadowColor,
    shadowOffset: commonStyles.shadow.shadowOffset,
    shadowOpacity: commonStyles.shadow.shadowOpacity,
    shadowRadius: commonStyles.shadow.shadowRadius,
    elevation: commonStyles.shadow.elevation,
  },
  headerTextContainer:{
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle:{
    fontSize: typography.caption.fontSize,
    color: colors.secondary,
  },
  headerTitle:{
    fontSize: typography.h1.fontSize,
    fontWeight: 600,
    color: colors.primary,
  },
  headerPlaceholder:{
    width:30,

  },
  cardActionRow:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  actionButton:{
    flexDirection: 'row',
    alignItems: 'center',

  },
  actionLabel:{
    fontSize: typography.body.fontSize,
    color: colors.secondary,
    marginLeft: spacing.xs,

  },
  viewLabel:{
    fontSize: typography.body.fontSize,
    color: colors.accentBlue,
    marginRight: spacing.xs,

  },
  emptyContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.lg,


  },
  emptyText:{
    fontSize: typography.body.fontSize,
    color: colors.secondary,
    textAlign: 'center',

  },
}); 