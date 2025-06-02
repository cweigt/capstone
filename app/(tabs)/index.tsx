import { 
  Image, 
  View 
} from 'react-native';
import React from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
// import { ThemedView } from '@/components/ThemedView';
import RSSFeed from '@/components/RSSFeed';
import { HomeStyles as styles } from '../../styles/Home.styles';

const HomeScreen = () => {
  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }}
      headerHeight={175}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/aurora-wdc.png')}
            style={styles.auroraLogo}
          />
        </View>
      }>

      <View style={{backgroundColor: "white"}}>
          <RSSFeed />
      </View>
    </ParallaxScrollView>
  );
}

export default HomeScreen;