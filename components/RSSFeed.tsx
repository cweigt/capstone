import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Linking, 
} from 'react-native';
import { Card } from '@rneui/themed';
import axios from 'axios';
import { auth } from '@/firebase';
import { useAuth } from '@/context/AuthContext';
import { Dropdown } from 'react-native-element-dropdown';
import { RSSFeedStyles as styles } from '../styles/RSSFeed.styles';
import { colors } from '../styles/theme';

interface RSSItem {
    title: string;
    link: string;   
    pubDate: string;
    description?: string;
}

interface FeedOption {
    label: string;
    value: string;
}

const RSSFeed = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<RSSItem[]>([]);
    const { user } = useAuth();
    const [feedOptions, setFeedOptions] = useState<FeedOption[]>([]);
    const [selectedFeed, setSelectedFeed] = useState<string>('');

    const extractContent = (xml: string, tag: string): string => {
        const start = xml.indexOf(`<${tag}>`) + tag.length + 2;
        const end = xml.indexOf(`</${tag}>`);
        return start > tag.length + 1 && end > start ? xml.substring(start, end) : '';
    };

    const parseDate = (dateStr: string): Date => {
        console.log('Attempting to parse date:', dateStr);
        
        // Try parsing RFC 822 format first (e.g., "Wed, 20 Mar 2024 15:30:00 GMT")
        const rfcDate = new Date(dateStr);
        if (!isNaN(rfcDate.getTime())) {
            return rfcDate;
        }

        // Try parsing "Month DD YYYY" format (e.g., "June 02 2025" or "Jun 02 2025")
        const monthDayYear = dateStr.match(/(\w+)\s+(\d{2})\s+(\d{4})/);
        if (monthDayYear) {
            const [_, month, day, year] = monthDayYear;
            console.log('Parsed date components:', { month, day, year });
            
            // Convert abbreviated month to numeric month (0-11)
            const monthMap: { [key: string]: number } = {
                'Jan': 0, 'Feb': 1, 'Mar': 2,
                'Apr': 3, 'May': 4, 'Jun': 5,
                'Jul': 6, 'Aug': 7, 'Sep': 8,
                'Oct': 9, 'Nov': 10, 'Dec': 11
            };
            
            const numericMonth = monthMap[month] ?? 0;
            const numericDay = parseInt(day, 10);
            const numericYear = parseInt(year, 10);
            
            return new Date(numericYear, numericMonth, numericDay);
        }

        // If all parsing fails, return current date
        console.warn(`Could not parse date: ${dateStr}`);
        return new Date();
    };

    // Fetch feed options when component mounts
    useEffect(() => {
        const fetchFeedOptions = async () => {
            try {
                const response = await axios.get('https://waleed.firstlight.am/feeds/list');
                const options = response.data.map((feed: { title: string, url: string }) => ({
                    label: feed.title.replace(/\[ID:\d+\]/, '').trim(),
                    value: feed.url.replace(/\/+/g, '/') // Fix double slashes in URL
                }));
                setFeedOptions(options);
                if (options.length > 0) {
                    setSelectedFeed(options[0].value);
                }
            } catch (error) {
                //console.error('Error fetching feed options:', error);
                setFeedOptions([]);
            }
        };
        
        fetchFeedOptions();
    }, []);

    // Fetch RSS data when selected feed changes
    useEffect(() => {
        if (user) {
            const fetchRSSData = async () => {
                try {
                    //console.log('Fetching from:', selectedFeed);
                    const response = await axios.get(selectedFeed);
                    //console.log('Response data:', response.data);
                    
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
                            //console.log('Processing item XML:', itemXml); // Debug log
                            
                            const title = extractContent(itemXml, 'title');
                            const link = extractContent(itemXml, 'link');
                            const pubDate = extractContent(itemXml, 'pubDate');
                            //console.log('Extracted pubDate:', pubDate); // Debug log
                            const description = extractContent(itemXml, 'description');
                            
                            if (title && link && pubDate) {
                                items.push({
                                    title,
                                    link,
                                    pubDate: parseDate(pubDate).toISOString(),
                                    description: description || undefined
                                });
                            }
                            
                            currentIndex = itemEnd + 7;
                        }
                        
                        //console.log('Parsed items:', items);
                        setData(items);
                    } else {
                        setData(response.data.items || []);
                    }
                } catch (error) {
                    //console.error('Error fetching RSS data:', error);
                    setData([]);
                } finally {
                    setLoading(false);
                }
            };
            fetchRSSData();
        }
    }, [user, selectedFeed]);

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Please sign in to view the RSS feed.</Text>
            </View>
        );
    }
    
    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <>
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
            <View style={styles.container}>
                <View style={styles.listContent}>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((item, index) => (
                            <Card key={index} containerStyle={styles.card}>
                                <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
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
                                    Read More
                                </Text>
                            </Card>
                        ))
                    ) : (
                        <Text style={styles.message}>No items available</Text>
                    )}
                </View>
            </View>
        </>
    );
};

export default RSSFeed;