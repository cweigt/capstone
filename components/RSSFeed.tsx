import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  Linking, 
} from 'react-native';
import { Card } from '@rneui/themed';
import axios from 'axios';
import { auth } from '@/firebase';
import { useAuth } from '@/context/AuthContext';
import { Dropdown } from 'react-native-element-dropdown';
interface RSSItem {
    title: string;
    link: string;   
    pubDate: string;
}


const RSSFeed = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<RSSItem[]>([]);
    const { user } = useAuth();
    const [selectedFeed, setSelectedFeed] = useState('https://rss2json.com/api.json?rss_url=https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
    
    const feedOptions = [
        { label: 'NY Times', value: 'https://rss2json.com/api.json?rss_url=https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
        { label: 'Axios', value: 'https://rss2json.com/api.json?rss_url=https://api.axios.com/feed/top/' },
        { label: 'BBC', value: 'https://rss2json.com/api.json?rss_url=https://feeds.bbci.co.uk/news/rss.xml' },
        { label: 'MindMatters', value: 'https://rss2json.com/api.json?rss_url=https://mindmatters.ai/feed/podcast' },
    ];

    //retrieving the feed and parsing the URL through API
    useEffect(() => {
        if (user) {
            const fetchRSSData = async () => {
                try {
                    //gets and sets the content from the API from the URL
                    const response = await axios.get(selectedFeed);
                    setData(response.data.items);
                } catch (error) {
                    console.error('Error fetching RSS data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchRSSData();
        }
    }, [user, selectedFeed]); //this happens everytime the user object changes

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
        <>
            <View style={styles.headerContainer}>
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
            <View style={styles.container}>
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
                        </Card>
                    ))}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 10,
    },
    container: {
        flex: 1,
        padding: 10,
        marginTop: 70,
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
      paddingVertical: 10,
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
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,        
    },
});

export default RSSFeed;