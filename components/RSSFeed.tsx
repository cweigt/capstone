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

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Linking,
    Pressable,
    RefreshControl,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Card } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import { auth } from '@/firebase';
import { getDatabase, ref, set, remove, get, onValue } from 'firebase/database';
import { useAuth } from '@/context/AuthContext';
import { RSSFeedStyles as styles } from '../styles/RSSFeed.styles';
import { colors, commonStyles } from '../styles/theme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ArticleCard from './ArticleCard';

interface RSSItem {
    title: string;
    link: string;
    author: string;
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
    setSelectedFeed,
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<RSSItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();
    const database = getDatabase();

    const extractContent = (xml: string, tag: string): string => {
    const start = xml.indexOf(`<${tag}>`) + tag.length + 2;
    const end = xml.indexOf(`</${tag}>`);
    return start > tag.length + 1 && end > start ? xml.substring(start, end) : '';
    };

    const parseDate = (dateStr: string): Date => {
    const rfcDate = new Date(dateStr);
    if (!isNaN(rfcDate.getTime())) {
        return rfcDate;
    }

    const monthDayYear = dateStr.match(/(\w+)\s+(\d{2})\s+(\d{4})/);
    if (monthDayYear) {
        const [_, month, day, year] = monthDayYear;
        const monthMap: { [key: string]: number } = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
        };
        return new Date(parseInt(year), monthMap[month] ?? 0, parseInt(day));
    }

    console.warn(`Could not parse date: ${dateStr}`);
    return new Date();
    };

    // Reusable fetch function
    const fetchRSSData = useCallback(async () => {
    if (!user || !selectedFeed) return;

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
            const author = extractContent(itemXml, 'author');

            if (title && link && pubDate) {
            items.push({
                title,
                link,
                author,
                pubDate: parseDate(pubDate).toISOString(),
                description,
                saved: false,
            });
            }

            currentIndex = itemEnd + 7;
        }

        setData(items);

        const savedRef = ref(database, `users/${user.uid}/savedArticles`);
        const listener = onValue(savedRef, (snapshot) => {
            const savedArticles = snapshot.val() || {};
            setData((prevData) =>
            prevData.map((item) => ({
                ...item,
                saved: !!savedArticles[item.link
                .replace(/[.#$\/[\]]/g, '_')
                .replace(/[:?&=]/g, '_')],
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
    }, [user, selectedFeed]);

    // Call once when selectedFeed/user changes
    useEffect(() => {
    fetchRSSData();
    }, [fetchRSSData]);

    // Fetch feed options initially
    useEffect(() => {
    const fetchFeedOptions = async () => {
        try {
        const response = await axios.get('https://waleed.firstlight.am/feeds/list');
        const options = response.data.map((feed: { title: string; url: string }) => ({
            label: feed.title.replace(/\[ID:\d+\]/, '').trim(),
            value: feed.url.replace(/\/+/g, '/'),
        }));
        setFeedOptions(options);
        if (options.length > 0) {
            setSelectedFeed(options[0].value);
        }
        } catch (error) {
        console.error('Error fetching feed options:', error);
        setFeedOptions([]);
        }
    };
    fetchFeedOptions();
    }, []);

    const toggleSave = async (index: number) => {
    if (!user) return;

    try {
        const item = data[index];
        const safeKey = item.link
        .replace(/[.#$\/[\]]/g, '_')
        .replace(/[:?&=]/g, '_');

        const savedRef = ref(database, `users/${user.uid}/savedArticles/${safeKey}`);
        const newSavedState = !item.saved;

        if (newSavedState) {
        const articleData = {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: item.description,
            author: item.author,
            savedAt: new Date().toISOString(),
        };
        await set(savedRef, articleData);
        } else {
        await remove(savedRef);
        }

        const newData = [...data];
        newData[index] = { ...newData[index], saved: newSavedState };
        setData(newData);
    } catch (error) {
        console.error('Error in toggleSave:', error);
    }
    };

    if (loading) {
    return (
        <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
    }

    return (
    <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.headerContainer}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerSubtitle}>
                    Current Feed
                </Text>
                <Text style={styles.headerTitle}>
                    Quantum Computing News
                </Text>
            </View>
            <View style={styles.headerPlaceholder}/>
        </View>
        
        <ScrollView
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
                setRefreshing(true);
                await fetchRSSData();
                setRefreshing(false);
            }}
            />
        }
        >

        <View style={styles.listContentContainer}>
            {Array.isArray(data) && data.length > 0 && user ? (
            data.map((item, index) => (
                <ArticleCard
                  key={index}
                  title={item.title}
                  link={item.link}
                  author={item.author}
                  pubDate={item.pubDate}
                  description={item.description}
                  saved={item.saved}
                  onSave={() => toggleSave(index)}
                  onShare={() => {
                    // TODO: Implement share functionality
                    console.log('Share article:', item.title);
                  }}
                />
            ))
            ) : (
            <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No articles available</Text>
            </View>
            )}
        </View>
        </ScrollView>
    </SafeAreaView>
    );
};

export default RSSFeed;
