import { StyleSheet } from 'react-native';
//this is shared between both privacy-policy and eula

export const LegalStyles = StyleSheet.create({
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
    content: {
        fontSize: 16, 
        lineHeight: 24,
    },
}); 