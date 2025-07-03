//this is the ideal template for ParallaxScrollView comop
//it previously did not take into account the keyboard and would break the code
//when combined with KeyboardAvoidingView
//this is the solution to that, and is the IDEAL TEMPLATE

import React, { useRef, useState, ReactElement } from 'react';
import {
    View,
    ScrollView,
    ViewStyle,
    Keyboard,
    Platform,
    RefreshControl,
    type RefreshControlProps
} from 'react-native';
import Animated, {
    useAnimatedStyle, 
    useSharedValue,
    useAnimatedScrollHandler,
    interpolate,
} from 'react-native-reanimated';
import { ParallaxScrollViewStyles as styles } from '../styles/ParallaxScrollView.styles';
import { colors } from '@/styles/theme';
// import { ThemedView } from '@/components/ThemedView';

interface ParallaxScrollViewProps {
    headerImage: React.ReactNode;
    headerBackgroundColor?: {
        light: string;
        dark: string;
    };
    children: React.ReactNode;
    headerHeight?: number;
    style?: ViewStyle;
    refreshControl?: React.ReactElement<RefreshControlProps>;
    
}

export const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
    headerImage,
    children,
    style,
    headerBackgroundColor,
    headerHeight,
    refreshControl
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
        return {
            transform: [
                { translateY: 0 },
                { scale: 1 },
            ] as const,
        };
    });

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    // if no argument is given for refreshControl, then make it so that pulling from top does nothing
    if (refreshControl == undefined || refreshControl == null)
    {
        refreshControl = (
            <RefreshControl
              refreshing={false}
              onRefresh={() => {}}
            />
        );
    } 



    return (
        <View style={[styles.container, style]}>
            <Animated.View
                style={[
                    styles.header,
                    headerAnimatedStyle,
                    { backgroundColor: headerBackgroundColor?.light || '#FFFFFF' }
                ]}
            >
                {headerImage}
            </Animated.View>
            <Animated.ScrollView
                refreshControl={
                    refreshControl
                  }
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