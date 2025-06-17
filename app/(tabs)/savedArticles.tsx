//Displays all saved articles from Firebase
    //Key features:
        //Fetches saved articles from users/${user.uid}/savedArticles
        //Shows articles in a similar card format to RSSFeed
        //Allows removing articles (unsaving)
        //Sorts articles by when they were saved (most recent first)
        //Shows a loading state while fetching
        //Displays a message when no articles are saved

import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity,
    ActivityIndicator,
    Pressable,
} from 'react-native';
import { router } from 'expo-router';
// import { ParallaxScrollView } from '@/components/ParallaxScrollView'; // Remove ParallaxScrollView import
import { Image } from 'react-native';
import { SavedArticlesStyles as styles } from '@/styles/SavedArticles.styles';
import { RSSFeedStyles as feedStyles } from '@/styles/RSSFeed.styles';
import { getDatabase, ref, set, get, onValue, remove } from 'firebase/database';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@rneui/themed';
import { Linking } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { colors, commonStyles } from '@/styles/theme';
import { Icon } from '@rneui/themed';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

//this is basically the Card that needs to be rendered into this page
interface SavedArticle {
    title: string;
    link: string;
    author: string;
    pubDate: string;
    description?: string;
    savedAt: string;
}

const SavedArticles = () => {
    const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const database = getDatabase();

    //removing the article from Firebase that is associated with that specific card
    const removeArticle = async (article: SavedArticle) => {
        if (!user) return;

        try {
            // Create a safe key for Firebase
            const safeKey = article.link
                .replace(/[.#$\/[\]]/g, '_')
                .replace(/:/g, '_')
                .replace(/\?/g, '_')
                .replace(/&/g, '_')
                .replace(/=/g, '_');

            const savedRef = ref(database, `users/${user.uid}/savedArticles/${safeKey}`);
            await remove(savedRef);
            
            //update local state of the articles
            setSavedArticles(prevArticles => 
                prevArticles.filter(a => a.link !== article.link)
            );
        } catch (error) {
            console.error('Error removing article:', error);
        }
    };

    //this gets the saved articles based on each user
    useEffect(() => {
        if (!user) return; //when there is no user

        const savedRef = ref(database, `users/${user.uid}/savedArticles`); //endpoint for saved articles
        const listener = onValue(savedRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const articles = Object.values(data) as SavedArticle[];
                //sort by savedAt date, most recent first
                articles.sort((a, b) => 
                    new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
                );
                setSavedArticles(articles); //populating the SavedArticles array with all the articles
            } else {
                setSavedArticles([]);
            }
            setLoading(false);
        });

        return () => listener();
    }, [user]); //runs everytime user changes

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>
                <Text style={styles.title}>
                    Saved Articles
                </Text>
            </View>
            <View style={feedStyles.listContentContainer}>
            {Array.isArray(savedArticles) && savedArticles.length > 0 ? (
            savedArticles.map((item, index) => (
                <Card key={index} containerStyle={styles.card}>
                <View style={feedStyles.cardHeaderRow}>
                <Text style={feedStyles.cardSource}>{item.author || 'Source'}</Text>
                <Text style={feedStyles.cardDate}>{new Date(item.pubDate).toLocaleDateString()}</Text>
                </View> 
                <Text style={styles.cardTitle}>{item.title}</Text>
                
                {item.description && (
                    <Text style={feedStyles.cardDescription} numberOfLines={3}>
                    {item.description}
                    </Text>
                )}

                <View style={feedStyles.cardActionRow}>
                    <TouchableOpacity style={feedStyles.actionButton} onPress={() => removeArticle(item)}>
                        <Icon
                        name="star"
                        color="#FFD700"
                        />
                        <Text style={[feedStyles.actionLabel, { color: colors.text }]}>Saved</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={feedStyles.actionButton}>
                            <Icon name="share" type="feather" color={colors.gray} />
                            <Text style={feedStyles.actionLabel}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={feedStyles.actionButton} onPress={() => Linking.openURL(item.link)}>
                            <Text style={feedStyles.viewLabel}>View</Text>
                            <Icon name="external-link" type="feather" color={colors.accentBlue || '#007AFF'} size={18} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                </View>
                </Card>
            ))
            ) : (
            <View style={feedStyles.emptyContainer}>
            <Text style={feedStyles.emptyText}>No articles available</Text>
            </View>
            )}
        </View>
            </ScrollView>
        </SafeAreaView>
    );
} 

export default SavedArticles;