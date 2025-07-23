import React, { useRef, useEffect } from 'react';
import { 
    View, 
    TextInput, 
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { searchStyles as styles } from '@/styles/Search.styles';
import { spacing } from '@/styles/theme';
import { IconSymbol } from './ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Search = ({ value, onChangeText, showSearchBar, setShowSearchBar }) => {
  const translateX = useRef(new Animated.Value(showSearchBar ? 0 : SCREEN_WIDTH)).current;
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);
  const { theme } = useTheme();

  //ternary operator to open and close
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: showSearchBar ? 0 : SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [showSearchBar]);

  //focus keyboard useEffect
  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  return (
    <Animated.View
      style={[styles.animation, {transform: [{translateX}], height: 80+insets.top, paddingTop: insets.top, backgroundColor: theme.background}]}
      pointerEvents={showSearchBar ? 'auto' : 'none'}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TouchableOpacity 
          onPress={() => setShowSearchBar(false)}
          style={{ marginRight: spacing.sm }}
        >
          <IconSymbol name="chevron.left" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={[styles.inputWrapper, { backgroundColor: theme.bar, borderColor: theme.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={theme.text} style={{ marginRight: spacing.sm }} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Search all feeds..."
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={theme.text}
            ref={inputRef}
          />
          <TouchableOpacity onPress={() => onChangeText('')}>
            <IconSymbol name="xmark" size={20} color={theme.text} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.divider, { borderBottomColor: theme.border }]}/>
    </Animated.View>
  );
};

export default Search; 