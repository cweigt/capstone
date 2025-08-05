//this is not used, we have our own way to collapse things based on what the target element is

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { CollapsibleStyles as styles } from '../styles/Collapsible.styles';
// import { ThemedView } from '@/components/ThemedView';

interface CollapsibleProps {
    title: string;
    children: React.ReactNode;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        Animated.timing(animation, {
            toValue: isExpanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const maxHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 500],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpand} style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.icon}>{isExpanded ? '▼' : '▶'}</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.content, { maxHeight }]}>
                <View style={{ backgroundColor: 'white' }}>
                    {children}
                </View>
            </Animated.View>
        </View>
    );
};
