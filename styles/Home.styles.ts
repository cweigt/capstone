import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography, commonStyles } from './theme';

export const HomeStyles = StyleSheet.create({
    container: {
        padding: spacing.md,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    stepContainer: {
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    auroraLogo: {
        marginTop: Platform.OS === 'ios' ? 1 : 10,
        marginLeft: Platform.OS === 'ios' ? 33 : 20,
        height: 175,
        width: Platform.OS === 'ios' ? 330 : 300,
        resizeMode: 'contain',
    },
    dropdownContainer: {
        width: '100%',
        backgroundColor: colors.background,
        marginTop: 60,
        padding: spacing.sm,
        paddingTop: spacing.lg,
        paddingHorizontal: Platform.OS === 'ios' ? spacing.sm : spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hamburger: {
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        padding: 5,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    feedTitleContainer: {
        flex: 1,
        alignItems: 'center',
        //marginRight: 40, // Account for hamburger menu width
    },
    dropdown: {
        height: 50,
        borderColor: colors.border,
        borderWidth: 0.5,
        borderRadius: commonStyles.card.borderRadius,
        paddingHorizontal: spacing.sm,
        backgroundColor: colors.background,
        marginBottom: Platform.OS === 'android' ? spacing.sm : 0,
        flex: 1,
    },
    message: {
        fontSize: typography.body.fontSize,
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? spacing.lg : spacing.md,
        marginBottom: Platform.OS === 'android' ? spacing.sm : 0,
        color: colors.text,
    },
    emptyContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: spacing.lg,
    
    
      },
      emptyText:{
        fontSize: typography.body.fontSize,
        color: colors.text,
        textAlign: 'center',
    
      },
      headerSubtitle: {
        fontSize: typography.body.fontSize,
        color: colors.text,
        textAlign: 'center',
    },
    headerTitle: {
        fontSize: typography.h2.fontSize,
        fontWeight: '500',
        color: colors.text,
        textAlign: 'center',
    },
}); 