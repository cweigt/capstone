import { StyleSheet } from 'react-native';
//this is shared between both privacy-policy and eula

export const legalStyles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
      },
      contentContainer: {
        paddingBottom: 32,
      },
      title2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 8,
      },
      paragraph: {
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 22,
      },
      listContainer: {
        marginLeft: 8,
        marginBottom: 12,
      },
      listItem: {
        fontSize: 16,
        marginLeft: 8,
        marginBottom: 4,
        lineHeight: 22,
      },
}); 