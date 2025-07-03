import React from 'react';
import { 
    View, 
    TextInput, 
    TouchableOpacity,
} from 'react-native';
import { searchStyles as styles } from '@/styles/Search.styles';
import { colors, spacing } from '@/styles/theme';
import { IconSymbol } from './ui/IconSymbol';

const Search = ({ value, onChangeText, showSearchBar, setShowSearchBar }) => {

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity 
          onPress={() => setShowSearchBar(false)}
          style={{marginBottom: spacing.md}}
        >
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.gray} style={{ marginRight: spacing.sm }} />
          <TextInput
            style={styles.input}
            placeholder="Search all feeds..."
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={colors.gray}
          />
          <TouchableOpacity onPress={() => onChangeText('')}>
            <IconSymbol name="xmark" size={20} color={colors.gray} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider}/>
    </>
  );
};

export default Search; 