import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  Linking, 
  ScrollView
} from 'react-native';
import { Card } from '@rneui/themed';
import axios from 'axios';
import { auth } from '@/firebase';
import { useAuth } from '@/context/AuthContext';
interface RSSItem {
    title: string;
    link: string;   
    pubDate: string;
}


const RSSFeed = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<RSSItem[]>([]);
    const { user } = useAuth();

    // Replace this with your RSS URL (use rss2json.com API)
    const feedUrl = 'https://rss2json.com/api.json?rss_url=https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'; // NY Times RSS
    const feedUrl2 = 'https://rss2json.com/api.json?rss_url=https://api.axios.com/feed/top/'; // Axios RSS
    const feedUrl3 = 'https://rss2json.com/api.json?rss_url=https://www.foxnews.com/rss/top-stories'; // Fox News RSS
    const feedUrl4 = 'https://rss2json.com/api.json?rss_url=https://www.politico.com/rss/morningtech.xml'; // Politico RSS
    const feedUrl5 = 'https://rss2json.com/api.json?rss_url=https://feeds.bbci.co.uk/news/rss.xml'; // BBC RSS
    const feedUrl6 = 'https://rss2json.com/api.json?rss_url=https://mindmatters.ai/feed/podcast'; // MindMatters RSS

    //retrieving the feed and parsing the URL through API
    useEffect(() => {
        if (user) {
            const fetchRSSData = async () => {
                try {
                    //gets and sets the content from the API from the URL
                    const response = await axios.get(feedUrl);
                    setData(response.data.items);
                } catch (error) {
                    console.error('Error fetching RSS data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchRSSData();
        }
    }, [user]); //this happens everytime the user object changes

    //this is to check to see if a user is here based on the listener, then go through this
    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Please sign in to view the RSS feed.</Text>
            </View>
        );
    }
    
    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    //this return statement returns the items found in with the API
    //don't move into another component unless you want to pass everything in
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Latest News</Text>
            <View style={styles.listContent}>
                {data.map((item, index) => (
                    <Card key={index} containerStyle={styles.card}>
                        <Card.Title>{item.title}</Card.Title>
                        <Text style={styles.date}>{new Date(item.pubDate).toLocaleString()}</Text>
                        <Text
                            style={styles.link}
                            onPress={() => {
                                Linking.openURL(item.link);
                            }}
                        >Read more
                        </Text>
                        {/*<Card.Divider />*/}
                    </Card>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    listContent: {
        paddingBottom: 80,
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    item: {
      marginBottom: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    date: {
      fontSize: 14,
      color: '#555',
    },
    link: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
    message: {
      fontSize: 16,
      textAlign: 'left',
      marginTop: 20,
      color: '#666',
    },
    card: {
        borderRadius: 8,
        marginBottom: 15,
    },
});

export default RSSFeed;