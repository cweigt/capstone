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
    description?: string;
}

const RSSFeed = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<RSSItem[]>([]);
    const { user } = useAuth();
    const [selectedFeed, setSelectedFeed] = useState('https://waleed.firstlight.am/aylienV2/proxyEndpoint/313');
    
    const feedOptions = [
        { label: 'Quantum Computing News', value: 'https://waleed.firstlight.am/aylienV2/proxyEndpoint/313' },
        { label: 'Quantum Patents', value: 'https://waleed.firstlight.am//patents//proxyEndpoint//320' },
    ];

    const extractContent = (xml: string, tag: string): string => {
        const start = xml.indexOf(`<${tag}>`) + tag.length + 2;
        const end = xml.indexOf(`</${tag}>`);
        return start > tag.length + 1 && end > start ? xml.substring(start, end) : '';
    };

    useEffect(() => {
        if (user) {
            const fetchRSSData = async () => {
                try {
                    const response = await axios.get(selectedFeed);
                    
                    if (selectedFeed.includes('waleed.firstlight.am')) {
                        const xmlString = response.data;
                        const items: RSSItem[] = [];
                        let currentIndex = 0;
                        
                        while (true) {
                            const itemStart = xmlString.indexOf('<item>', currentIndex);
                            if (itemStart === -1) break;
                            
                            const itemEnd = xmlString.indexOf('</item>', itemStart);
                            if (itemEnd === -1) break;
                            
                            const itemXml = xmlString.substring(itemStart, itemEnd + 7);
                            
                            const title = extractContent(itemXml, 'title');
                            const link = extractContent(itemXml, 'link');
                            const pubDate = extractContent(itemXml, 'pubDate');
                            const description = extractContent(itemXml, 'description');
                            
                            if (title && link && pubDate) {
                                items.push({
                                    title,
                                    link,
                                    pubDate,
                                    description: description || undefined
                                });
                            }
                            
                            currentIndex = itemEnd + 7;
                        }
                        
                        setData(items);
                    } else {
                        setData(response.data.items || []);
                    }
                } catch (error) {
                    setData([]);
                } finally {
                    setLoading(false);
                }
            };
            fetchRSSData();
        }
    }, [user, selectedFeed]);

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
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((item, index) => (
                            <Card key={index} containerStyle={styles.card}>
                                <Card.Title>{item.title}</Card.Title>
                                <Text style={styles.date}>
                                    {new Date(item.pubDate).toLocaleString()}
                                </Text>
                                {item.description && (
                                    <Text style={styles.description} numberOfLines={3}>
                                        {item.description}
                                    </Text>
                                )}
                                <Text
                                    style={styles.link}
                                    onPress={() => {
                                        Linking.openURL(item.link);
                                    }}
                                >
                                    Read more
                                </Text>
                            </Card>
                        ))
                    ) : (
                        <Text style={styles.message}>No articles available</Text>
                    )}
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
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default RSSFeed;