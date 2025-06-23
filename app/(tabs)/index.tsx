import { 
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
// import { ThemedView } from '@/components/ThemedView';
import RSSFeed from '@/components/RSSFeed';
import SideDrawer from '@/components/SideDrawer';
import { HomeStyles as styles } from '../../styles/Home.styles';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@rneui/themed';
import { colors } from '@/styles/theme';
import axios from 'axios';

interface FeedOption {
  label: string;
  value: string;
}

const HomeScreen = () => {
  const [feedOptions, setFeedOptions] = useState<FeedOption[]>([]);
  const [selectedFeed, setSelectedFeed] = useState('');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const {user} = useAuth();
  const [feedNum, setFeedNum] = useState(0); //this tracks number of feeds

  //Fetch feed options initially
  //this is shared between the SideDrawer and RSSFeed
  useEffect(() => {
    const fetchFeedOptions = async () => {
      try {
        /*const response = await axios.get('https://waleed.firstlight.am/feeds/list');
        const options = response.data.map((feed: { title: string; url: string }) => ({
          label: feed.title.replace(/\[ID:\d+\]/, '').trim(),
          value: feed.url.replace(/\/+/g, '/'),
        }));*/

        const options = [
          { label: "AI in HR", value: "https://clientmobile.firstlight.am/widget/rss/118" },
          { label: "AI in the DoD", value: "https://clientmobile.firstlight.am/widget/rss/119" },
          { label: "Amazon", value: "https://clientmobile.firstlight.am/widget/rss/120" },
          { label: "Citigroup", value: "https://clientmobile.firstlight.am/widget/rss/115" },
          { label: "OneDigital", value: "https://clientmobile.firstlight.am/widget/rss/116" },
          { label: "KFF", value: "https://clientmobile.firstlight.am/widget/rss/121" },
          { label: "Semiconductors", value: "https://clientmobile.firstlight.am/widget/rss/117" },
          { label: "UHC", value: "https://clientmobile.firstlight.am/widget/rss/123" },
          { label: "Walgreens", value: "https://clientmobile.firstlight.am/widget/rss/124" },
          { label: "WH Executive Orders", value: "https://clientmobile.firstlight.am/widget/rss/125" }
        ];
        //this log shows us what feeds are fetched
        //good for us to know if it fetches when more stuff is added
        console.log('Feed options fetched:', options);
        setFeedOptions(options);
        setFeedNum(options.length); //feedNum is set to length of options
        if (options.length > 0) {
          setSelectedFeed(options[0].value);
        }
      } catch (error) {
        console.error('Error fetching feed options:', error);
        setFeedOptions([]);
        setFeedNum(0);
      }
    };
    fetchFeedOptions();
  }, []);

  const handleFeedSelect = (feed: string) => {
    setSelectedFeed(feed);
    // Keep drawer open - user can close it manually when they want
  };

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
                <View style={styles.headerRow}>
                  <TouchableOpacity onPress={() => setIsDrawerVisible(true)}>
                    <Icon 
                      name="menu" 
                      size={30} 
                      color={colors.text}
                      style={styles.hamburger}
                    />
                  </TouchableOpacity>
                  <View style={styles.feedTitleContainer}>
                    <Text style={styles.headerSubtitle}>
                      Current Feed
                    </Text>
                    <Text style={styles.headerTitle}>
                      {feedOptions.find(feed => feed.value === selectedFeed)?.label
                      /*this displays the current feed title in the header*/}
                    </Text>
                  </View>
                </View>
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
          <RSSFeed //passing from the managed state here
            feedOptions={feedOptions}
            setFeedOptions={setFeedOptions}
            selectedFeed={selectedFeed}
            setSelectedFeed={setSelectedFeed}
          />
        </View>
      </ParallaxScrollView>
      
      <SideDrawer //home page manages feed fetching so that it can be passed
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        feedOptions={feedOptions}
        selectedFeed={selectedFeed}
        onFeedSelect={handleFeedSelect}
        feedNum={feedNum}
      />
    </KeyboardAvoidingView>
  );
}

export default HomeScreen;