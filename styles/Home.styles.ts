import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography } from './theme';

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
        padding: spacing.sm,
        paddingHorizontal: Platform.OS === 'ios' ? spacing.sm : spacing.md,
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
        backgroundColor: colors.background,
        marginBottom: Platform.OS === 'android' ? spacing.sm : 0,
    },
    message: {
        fontSize: typography.body.fontSize,
        textAlign: 'left',
        marginTop: Platform.OS === 'ios' ? spacing.lg : spacing.md,
        marginBottom: Platform.OS === 'android' ? spacing.sm : 0,
        color: colors.text,
        opacity: 0.7,
    },
}); 