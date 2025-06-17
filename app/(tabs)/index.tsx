import { 
  Image, 
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
// import { ThemedView } from '@/components/ThemedView';
import RSSFeed from '@/components/RSSFeed';
import { HomeStyles as styles } from '../../styles/Home.styles';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@rneui/themed';
import { colors } from '@/styles/theme';

const HomeScreen = () => {
  const [feedOptions, setFeedOptions] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState('');
  const {user} = useAuth();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ParallaxScrollView 
        headerImage={
          <>
            {user ? (
              <View style={styles.dropdownContainer}>
                <TouchableOpacity onPress={() =>{}}>
                  <Icon 
                    name="menu" 
                    size={30} 
                    color={colors.text}
                    style={styles.hamburger}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.dropdownContainer}>
                <Text style={styles.message}>Please sign in to view feed.</Text>
              </View>
            )}
          </>
        }
      >
        <View style={{backgroundColor: "white", flex: 1}}>
          <RSSFeed 
            feedOptions={feedOptions}
            setFeedOptions={setFeedOptions}
            selectedFeed={selectedFeed}
            setSelectedFeed={setSelectedFeed}
          />
        </View>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}

export default HomeScreen;