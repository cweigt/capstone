import { 
  Image, 
  View 
} from 'react-native';
import React, { useState } from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
// import { ThemedView } from '@/components/ThemedView';
import RSSFeed from '@/components/RSSFeed';
import { HomeStyles as styles } from '../../styles/Home.styles';
import { Dropdown } from 'react-native-element-dropdown';
import { RSSFeedStyles as rssStyles } from '../../styles/RSSFeed.styles';

const HomeScreen = () => {
  const [feedOptions, setFeedOptions] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView 
        headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }}
        headerHeight={225}
        headerImage={
          <View style={styles.headerContainer}>
            <Image
              source={require('@/assets/images/aurora-wdc.png')}
              style={styles.auroraLogo}
            />
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
          </View>
        }
      >
        <View style={{backgroundColor: "white"}}>
          <RSSFeed 
            feedOptions={feedOptions}
            setFeedOptions={setFeedOptions}
            selectedFeed={selectedFeed}
            setSelectedFeed={setSelectedFeed}
          />
        </View>
      </ParallaxScrollView>
    </View>
  );
}

export default HomeScreen;