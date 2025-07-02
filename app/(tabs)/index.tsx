import { 
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import SideDrawer from '@/components/SideDrawer';
import { HomeStyles as styles } from '../../styles/Home.styles';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@rneui/themed';
import { colors } from '@/styles/theme';
import axios from 'axios';
import Search from '@/components/Search';
import ArticleCard from '@/components/ArticleCard';
import { getDatabase, ref, set, remove, get, onValue } from 'firebase/database';
import decodeHtml from '@/utils/decodeHTML';
import { RefreshControl } from 'react-native';

interface FeedOption {
  label: string;
  value: string;
}

type Article = {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description?: string;
  saved?: boolean;
};

const HomeScreen = () => {
  const [feedOptions, setFeedOptions] = useState<FeedOption[]>([]);
  const [selectedFeed, setSelectedFeed] = useState('');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const {user} = useAuth();
  const [feedNum, setFeedNum] = useState(0); //this tracks number of feeds
  const [searchQuery, setSearchQuery] = useState(''); //for search bar
  const [allArticles, setAllArticles] = useState<Article[]>([]); //for all articles
  const [currentFeedArticles, setCurrentFeedArticles] = useState<Article[]>([]); //for selected feed
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Article[]>([]);
  const [savedLinks, setSavedLinks] = useState<string[]>([]);
  const database = getDatabase();
  const [refreshing, setRefreshing] = useState(false);

  //Fetch feed options initially
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
        setFeedOptions(options);
        setFeedNum(options.length);
        if (options.length > 0) {
          setSelectedFeed(options[0].value);
        }
      } catch (error) {
        setFeedOptions([]);
        setFeedNum(0);
      }
    };
    fetchFeedOptions();
  }, []);

  const fetchAllArticles = async () => {
    if (!user || feedOptions.length === 0) return;
    setLoading(true);
    try {
      const allResults: Article[] = [];
      await Promise.all(feedOptions.map(async (feed) => {
        try {
          const response = await axios.get(feed.value);
          if (feed.value.includes('clientmobile.firstlight.am')) {
            const xmlString = response.data;
            let currentIndex = 0;
            while (true) {
              const itemStart = xmlString.indexOf('<item>', currentIndex);
              if (itemStart === -1) break;
              const itemEnd = xmlString.indexOf('</item>', itemStart);
              if (itemEnd === -1) break;
              const itemXml = xmlString.substring(itemStart, itemEnd + 7);
              const extract = (tag) => {
                //This regex matches <tag ...>content</tag> and captures the content
                const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
                const match = itemXml.match(regex);
                return match ? match[1].trim() : '';
              };
              const title = decodeHtml(extract('title'));
              const link = extract('link');
              const pubDate = extract('pubDate');
              const description = decodeHtml(extract('description'));
              const author = extract('source');
              if (title && link && pubDate) {
                allResults.push({
                  title,
                  link,
                  author,
                  pubDate: new Date(pubDate).toISOString(),
                  description,
                });
              }
              currentIndex = itemEnd + 7;
            }
          } else if (response.data.items) {
            allResults.push(...response.data.items);
          }
        } catch (e) {
          // Ignore individual feed errors
        }
      }));
      setAllArticles(allResults);
    } catch (e) {
      setAllArticles([]);
    } finally {
      setLoading(false);
    }
  };

  //Fetch all articles from all feeds for global search
  //this is NOT DISPLAYED directly within each card
  //RSSFeed component is useless now because we lifted fetching and search to parent component
  useEffect(() => {
    
    fetchAllArticles();
  }, [user, feedOptions]);

  //fetch articles for the selected feed only
  //this IS DISPLAYED on the screen
  useEffect(() => {
    const fetchCurrentFeedArticles = async () => {
      if (!user || !selectedFeed) return;
      setLoading(true);
      try {
        const response = await axios.get(selectedFeed);
        const results: Article[] = [];
        if (selectedFeed.includes('clientmobile.firstlight.am')) {
          const xmlString = response.data;
          let currentIndex = 0;
          while (true) {
            const itemStart = xmlString.indexOf('<item>', currentIndex);
            if (itemStart === -1) break;
            const itemEnd = xmlString.indexOf('</item>', itemStart);
            if (itemEnd === -1) break;
            const itemXml = xmlString.substring(itemStart, itemEnd + 7);
            const extract = (tag) => {
              //This regex matches <tag ...>content</tag> and captures the content
              const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
              const match = itemXml.match(regex);
              return match ? match[1].trim() : '';
            };
            const title = decodeHtml(extract('title'));
            const link = extract('link');
            const pubDate = extract('pubDate');
            const description = decodeHtml(extract('description'));
            const author = extract('source');
            if (title && link && pubDate) {
              results.push({
                title,
                link,
                author,
                pubDate: new Date(pubDate).toISOString(),
                description,
              });
            }
            currentIndex = itemEnd + 7;
          }
        } else if (response.data.items) {
          results.push(...response.data.items);
        }
        setCurrentFeedArticles(results);
      } catch (e) {
        setCurrentFeedArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentFeedArticles();
  }, [user, selectedFeed]);

  // Fetch saved article links from Firebase
  useEffect(() => {
    if (!user) return;
    const savedRef = ref(database, `users/${user.uid}/savedArticles`);
    const unsubscribe = onValue(savedRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSavedLinks(Object.values(data).map((a: any) => a.link));
      } else {
        setSavedLinks([]);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleFeedSelect = (feed: string) => {
    setSelectedFeed(feed);
  };

  //saving the article using the toggleSave button
  const toggleSave = async (item: Article) => {
    if (!user) return;
    const database = getDatabase();
    const safeKey = item.link
      .replace(/[.#$\/[\]]/g, '_')
      .replace(/[:?&=]/g, '_');
    const savedRef = ref(database, `users/${user.uid}/savedArticles/${safeKey}`);

    if (savedLinks.includes(item.link)) {
      await remove(savedRef);
    } else {
      const articleData = {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description,
        author: item.author,
        savedAt: new Date().toISOString(),
      };
      await set(savedRef, articleData);
    }
  };

  // Filter articles based on searchQuery
  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Decide which articles to show
  const articlesToShow = searchQuery.trim() === '' ? currentFeedArticles : filteredArticles;


  const handleRefresh = async () => {
     // console.log("refreshing");
    setRefreshing(true);
    // setError(null); // if error state exists
    await fetchAllArticles(); // reuse fetch logic
    setRefreshing(false);
    
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
                      {feedOptions.find(feed => feed.value === selectedFeed)?.label}
                    </Text>
                  </View>
                </View>
                <View style={{width: '95%'}}>
                  <Search value={searchQuery} onChangeText={setSearchQuery} />
                </View>
              </View>
            ) : (
              <View style={styles.dropdownContainer}>
                <Text style={styles.message}>Please sign in to view feed.</Text>
              </View>
            )}
          </>
        }
        // pull-from-top to refresh
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.accentBlue}
        />}
      >
        <View style={{backgroundColor: "white", flex: 1, paddingTop: 220, paddingBottom: 20}}>
          {loading ? (
            <Text style={{textAlign: 'center', marginTop: 40}}>Loading articles...</Text>
          ) : articlesToShow.length > 0 ? (
            articlesToShow.map((item, index) => (
              <ArticleCard
                key={index}
                title={item.title}
                link={item.link}
                author={item.author}
                pubDate={item.pubDate}
                description={item.description}
                saved={savedLinks.includes(item.link)}
                showSavedIcon={true}
                onSave={() => toggleSave(item)}
                onShare={() => {}}
              />
            ))
          ) : (
            <Text style={{textAlign: 'center', marginTop: 40}}>No articles found.</Text>
          )}
        </View>
      </ParallaxScrollView>
      <SideDrawer
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