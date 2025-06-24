import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

const { width } = require('react-native').Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8;

export const sideDrawerStyles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    drawer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: DRAWER_WIDTH,
      height: '100%',
      backgroundColor: colors.background,
      shadowColor: colors.text,
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    header: {
      flexDirection: 'column',
      padding: spacing.md,
      paddingTop: 60,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    headerTitle: {
      fontSize: typography.h2.fontSize,
      fontWeight: '600',
      color: colors.text,
    },
    headerSubtitle: {
      fontSize: typography.body.fontSize,
      color: colors.text,
      textAlign: 'left',
      marginBottom: -10,
    },
    headerSubtitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: -10,
    },
    headerSubtitleNumber: {
      fontSize: typography.body.fontSize,
      color: colors.gray,
      textAlign: 'left',
      marginTop: 10.5,
    },
    headerLogo: {
      height: 50,
      width: 150,
    },
    closeButton: {
      padding: spacing.xs,
    },
    menuContainer: {
      padding: spacing.md,
      paddingTop: spacing.sm,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.sm,
      marginVertical: spacing.xs,
      borderRadius: 8,
    },
    selectedMenuItem: {
      backgroundColor: 'transparent',
    },
    menuText: {
      fontSize: typography.body.fontSize,
      color: colors.gray,
    },
    selectedMenuText: {
      color: '#000000',
      fontWeight: '600',
    },
  });