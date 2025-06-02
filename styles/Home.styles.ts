import { StyleSheet } from 'react-native';
import { spacing } from './theme';

export const HomeStyles = StyleSheet.create({
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
        height: 175,
        width: 330,
        resizeMode: 'contain',
    },
}); 