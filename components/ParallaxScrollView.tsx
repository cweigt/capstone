//this is the ideal template for ParallaxScrollView comop
//it previously did not take into account the keyboard and would break the code
//when combined with KeyboardAvoidingView
//this is the solution to that, and is the IDEAL TEMPLATE

import React, { useRef, useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    ViewStyle,
    Keyboard,
    Platform,
} from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    useSharedValue,
    useAnimatedScrollHandler,
    interpolate
} from 'react-native-reanimated';
// import { ThemedView } from '@/components/ThemedView';

interface ParallaxScrollViewProps {
    headerImage: React.ReactNode;
    headerBackgroundColor: {
        light: string;
        dark: string;
    };
    children: React.ReactNode;
    headerHeight?: number;
    style?: ViewStyle;
}

export const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
    headerImage,
    headerBackgroundColor,
    children,
    headerHeight = 200,
    style,
}) => {
    const scrollY = useSharedValue(0);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const headerAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
        const translateY = interpolate(
            scrollY.value,
            [-headerHeight, 0, headerHeight],
            [headerHeight / 2, 0, -headerHeight / 2],
            
        );

        const scale = interpolate(
            scrollY.value,
            [-headerHeight, 0, headerHeight],
            [1.5, 1, 1],
            
        );

        return {
            transform: [
                { translateY: translateY },
                { scale: scale },
            ] as const,
        };
    });

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    return (
        <View style={[styles.container, style]}>
            <Animated.View 
                style={[
                    styles.header, 
                    headerAnimatedStyle,
                    { backgroundColor: headerBackgroundColor.light }
                ]}
            >
                {headerImage}
            </Animated.View>
            <Animated.ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.contentContainer,
                    { paddingTop: headerHeight },
                ]}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
            >
                <View style={{ backgroundColor: 'white' }}>
                    {children}
                </View>
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
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