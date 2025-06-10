//RSSFeed.tsx:
    //Main component that displays RSS feed articles
    //Key features:
        //Fetches feed options from https://waleed.firstlight.am/feeds/list
        //Displays articles in cards with:
            //Title
            //Publication date
            //Description
            //"Read More" link
            //Star button for saving
        //Saves articles to Firebase at users/${user.uid}/savedArticles/${safeKey}
        //Uses real-time updates to sync the star state with Firebase
        //Handles article saving/unsaving through the toggleSave function

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Linking,
  Pressable,
} from 'react-native';
import { Card } from '@rneui/themed';
import axios from 'axios';
import { auth } from '@/firebase';
import { getDatabase, ref, set, remove, get, onValue } from 'firebase/database';
import { useAuth } from '@/context/AuthContext';
import { RSSFeedStyles as styles } from '../styles/RSSFeed.styles';
import { colors } from '../styles/theme';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface RSSItem {
    title: string;
    link: string;   
    pubDate: string;
    description?: string;
    saved?: boolean;
}

interface FeedOption {
    label: string;
    value: string;
}

interface RSSFeedProps {
    feedOptions: FeedOption[];
    setFeedOptions: (options: FeedOption[]) => void;
    selectedFeed: string;
    setSelectedFeed: (feed: string) => void;
}

const RSSFeed: React.FC<RSSFeedProps> = ({
    feedOptions,
    setFeedOptions,
    selectedFeed,
    setSelectedFeed
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<RSSItem[]>([]);
    const { user } = useAuth();
    const database = getDatabase();

    //manually parsing the data retrieved from the XML file
    const extractContent = (xml: string, tag: string): string => {
        const start = xml.indexOf(`<${tag}>`) + tag.length + 2;
        const end = xml.indexOf(`</${tag}>`);
        return start > tag.length + 1 && end > start ? xml.substring(start, end) : '';
    };

    const parseDate = (dateStr: string): Date => {
        //console.log('Attempting to parse date:', dateStr);
        
        // Try parsing RFC 822 format first (e.g., "Wed, 20 Mar 2024 15:30:00 GMT")
        const rfcDate = new Date(dateStr);
        if (!isNaN(rfcDate.getTime())) {
            return rfcDate;
        }

        // Try parsing "Month DD YYYY" format (e.g., "June 02 2025" or "Jun 02 2025")
        const monthDayYear = dateStr.match(/(\w+)\s+(\d{2})\s+(\d{4})/);
        if (monthDayYear) {
            const [_, month, day, year] = monthDayYear;
            //console.log('Parsed date components:', { month, day, year });
            
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

    // Fetch feed options when component mounts… displayed in dropdown
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

    // Fetch RSS data when selected feed changes… displayed in actual page
    useEffect(() => {
        if (!user) return;
        
        const fetchRSSData = async () => {
            try {
                setLoading(true);
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
                                pubDate: parseDate(pubDate).toISOString(),
                                description: description || undefined,
                                saved: false
                            });
                        }
                        
                        currentIndex = itemEnd + 7;
                    }
                    
                    // Set initial data
                    setData(items);
                    
                    // Listen for saved articles changes
                    const savedRef = ref(database, `users/${user.uid}/savedArticles`);
                    const listener = onValue(savedRef, (snapshot) => {
                        const savedArticles = snapshot.val() || {};
                        
                        // Update saved status for each item
                        setData(prevData => 
                            prevData.map(item => ({
                                ...item,
                                saved: !!savedArticles[item.link
                                    .replace(/[.#$\/[\]]/g, '_')
                                    .replace(/:/g, '_')
                                    .replace(/\?/g, '_')
                                    .replace(/&/g, '_')
                                    .replace(/=/g, '_')]
                            }))
                        );
                    });
                    
                    return () => listener();
                } else {
                    setData(response.data.items || []);
                }
            } catch (error) {
                console.error('Error fetching RSS data:', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchRSSData();
    }, [user, selectedFeed]); //everytime user or selectedFeed changes

    const toggleSave = async (index: number) => {
        if (!user) {
            // console.log('No user logged in');
            return;
        }

        try {
            const item = data[index];
            if (!item) {
                // console.log('No item found at index:', index);
                return;
            }

            // console.log('Toggling save for item:', item.title);
            // console.log('Current saved state:', item.saved);

            // Create a safe key for Firebase by replacing invalid characters
            const safeKey = item.link
                .replace(/[.#$\/[\]]/g, '_')
                .replace(/:/g, '_')
                .replace(/\?/g, '_')
                .replace(/&/g, '_')
                .replace(/=/g, '_');
                
            const savedRef = ref(database, `users/${user.uid}/savedArticles/${safeKey}`);
            
            const newSavedState = !item.saved;
            // console.log('Attempting to set new saved state:', newSavedState);
            
            if (newSavedState) {
                // Save the article
                // console.log('Saving to Firebase...');
                const articleData = {
                    title: item.title,
                    link: item.link,
                    pubDate: item.pubDate,
                    description: item.description,
                    savedAt: new Date().toISOString()
                };
                // console.log('Article data:', articleData);
                
                try {
                    await set(savedRef, articleData);
                    // console.log('Successfully saved to Firebase');
                } catch (firebaseError) {
                    console.error('Firebase save error:', firebaseError);
                    return;
                }
            } else {
                // Remove the article
                // console.log('Removing from Firebase...');
                try {
                    await remove(savedRef);
                    // console.log('Successfully removed from Firebase');
                } catch (firebaseError) {
                    console.error('Firebase remove error:', firebaseError);
                    return;
                }
            }

            // Update local state immediately
            // console.log('Updating local state...');
            const newData = [...data];
            newData[index] = { ...newData[index], saved: newSavedState };
            
            // console.log('Setting new data with updated state');
            setData(newData);
            
            // Verify the state was updated
            // console.log('Verifying state update...');
            //const updatedItem = newData[index];
            // console.log('Updated item state:', updatedItem.saved);
            
        } catch (error) {
            console.error('Error in toggleSave:', error);
        }
    };

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
                            <View style={styles.cardFooter}>
                                <Pressable
                                    onPress={() => {
                                        //console.log('Read More pressed');
                                        Linking.openURL(item.link);
                                    }}
                                >
                                    <Text style={styles.link}>
                                        Read More
                                    </Text>
                                </Pressable>
                                <Pressable 
                                    onPress={() => {
                                        //console.log('Star pressed');
                                        toggleSave(index);
                                    }}
                                    style={({ pressed }) => [
                                        styles.starButton,
                                        { 
                                            transform: [{ scale: pressed ? 1.2 : 1 }],
                                        }
                                    ]}
                                >
                                    <IconSymbol 
                                        name={item.saved ? "star.fill" : "star"} 
                                        size={24} 
                                        color={item.saved ? "#FFD700" : colors.text} 
                                    />
                                </Pressable>
                            </View>
                        </Card>
                    ))
                ) : (
                    <Text style={styles.message}>No items available</Text>
                )}
            </View>
        </View>
    );
};

export default RSSFeed;