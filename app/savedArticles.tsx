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
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { Image } from 'react-native';
import { SavedArticlesStyles as styles } from '@/styles/SavedArticles.styles';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@rneui/themed';
import { Linking } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { colors } from '@/styles/theme';
import { useState, useEffect } from 'react';

//this is basically the Card that needs to be rendered into this page
interface SavedArticle {
    title: string;
    link: string;
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
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }}
            headerHeight={175}
            headerImage={
                <Image
                    source={require('@/assets/images/aurora-wdc.png')}
                    style={styles.auroraLogo}
                />
            }
        >
            <View style={{ backgroundColor: 'white', padding: 20 }}>
                <TouchableOpacity 
                    onPress={() => router.back()}
                    style={{ marginBottom: 20 }}
                >
                    <Text style={styles.back}>← Back</Text>
                </TouchableOpacity>
                
                <Text style={styles.title}>
                    Saved Articles
                </Text>
                
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : savedArticles.length > 0 ? (
                    <ScrollView>
                        {savedArticles.map((article, index) => (
                            <Card key={index} containerStyle={styles.card}>
                                <Card.Title style={styles.cardTitle}>{article.title}</Card.Title>
                                {article.description && (
                                    <Text style={styles.description} numberOfLines={3}>
                                        {article.description}
                                    </Text>
                                )}
                                <View style={styles.cardFooter}>
                                    <Pressable
                                        onPress={() => {
                                            Linking.openURL(article.link);
                                        }}
                                    >
                                        <Text style={styles.link}>
                                            Read More
                                        </Text>
                                    </Pressable>
                                    <Text style={styles.date}>
                                        {new Date(article.pubDate).toLocaleDateString()}
                                    </Text>
                                </View>
                                <View style={styles.starContainer}>
                                    <Pressable 
                                        onPress={() => removeArticle(article)}
                                        style={({ pressed }) => [
                                            styles.starButton,
                                            { 
                                                transform: [{ scale: pressed ? 1.2 : 1 }],
                                            }
                                        ]}
                                    >
                                        <IconSymbol 
                                            name="star.fill" 
                                            size={24} 
                                            color="#FFD700"
                                        />
                                    </Pressable>
                                </View>
                            </Card>
                        ))}
                    </ScrollView>
                ) : (
                    <Text style={styles.message}>No saved articles yet</Text>
                )}
            </View>
        </ParallaxScrollView>
    );
} 

export default SavedArticles;