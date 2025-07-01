import { StyleSheet } from 'react-native';

export const ParallaxScrollViewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
}); 