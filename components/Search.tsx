import React, {useState} from 'react';
import { 
    View, 
    TextInput, 
    TouchableOpacity,
} from 'react-native';
import { searchStyles as styles } from '@/styles/Search.styles';
import { colors } from '@/styles/theme';
import { IconSymbol } from './ui/IconSymbol';

const Search = ({ value, onChangeText }) => {
  //the actual results are in the home page and are rendered there
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <IconSymbol name="magnifyingglass" size={20} color={colors.gray} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder='Search all feeds...'
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.gray}
        />
        <TouchableOpacity
            onPress={() => {onChangeText('')}}
        >
            <IconSymbol name="xmark" size={20} color={colors.gray} style={{marginLeft: 8}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Search; 