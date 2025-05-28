import { 
  Image, 
  StyleSheet,
  View 
} from 'react-native';
import React from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
// import { ThemedView } from '@/components/ThemedView';
import RSSFeed from '@/components/RSSFeed';

const HomeScreen = () => {
  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }}
      headerHeight={175}
      headerImage={
        <Image
          source={require('@/assets/images/aurora-wdc.png')}
          style={styles.auroraLogo}
        />
      }>

      <View style={{backgroundColor: "white"}}>
          <RSSFeed />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  auroraLogo: {
    marginTop: 1,
    marginLeft: 33,
    height: 175,
    width: 330,
    resizeMode: 'contain',
  },
  
});

export default HomeScreen;