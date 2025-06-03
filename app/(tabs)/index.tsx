import { 
  Image, 
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import React, { useState } from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
// import { ThemedView } from '@/components/ThemedView';
import RSSFeed from '@/components/RSSFeed';
import { HomeStyles as styles } from '../../styles/Home.styles';
import { Dropdown } from 'react-native-element-dropdown';
import { RSSFeedStyles as rssStyles } from '../../styles/RSSFeed.styles';
import { useAuth } from '@/context/AuthContext';

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
        headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }}
        headerHeight={175}
        headerImage={
          <>
            <Image
              source={require('@/assets/images/aurora-wdc.png')}
              style={styles.auroraLogo}
            />
            {user ? (
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  data={feedOptions}
                  labelField="label"
                  valueField="value"
                  value={selectedFeed}
                  onChange={item => setSelectedFeed(item.value)}
                  placeholder="Select News Source"
                />
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