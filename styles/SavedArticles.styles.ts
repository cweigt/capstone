import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';
//this is shared between both privacy-policy and eula

export const SavedArticlesStyles = StyleSheet.create({
    auroraLogo: {
        marginTop: 1,
        marginLeft: 33,
        height: 175,
        width: 330,
        resizeMode: 'contain',
    },
    back: {
        color: '#007AFF', 
        fontSize: 16,
    },
    title: {
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20,
    },
    card: {
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        backgroundColor: colors.background,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    date: {
        color: colors.text,
        fontSize: 12,
        marginLeft: 'auto',
    },
    description: {
        fontSize: 14,
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
    link: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    message: {
        fontSize: 16,
        color: colors.text,
        textAlign: 'center',
        marginTop: 20,
    },
}); 