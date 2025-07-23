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
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'column',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 13,
    textAlign: 'left',
    marginBottom: -10,
  },
  headerSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
  headerSubtitleNumber: {
    fontSize: 13,
    textAlign: 'left',
    marginTop: 10.5,
  },
  headerLogo: {
    height: 50,
    width: 150,
  },
  closeButton: {
    padding: 4,
  },
  menuContainer: {
    padding: 16,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  selectedMenuItem: {
    backgroundColor: 'transparent',
  },
  menuText: {
    fontSize: 13,
  },
  selectedMenuText: {
    fontWeight: '600',
  },
  });