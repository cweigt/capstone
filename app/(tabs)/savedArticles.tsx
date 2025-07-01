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
} from 'react-native';
import { SavedArticlesStyles as styles } from '@/styles/SavedArticles.styles';
import { RSSFeedStyles as feedStyles } from '@/styles/RSSFeed.styles';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import ArticleCard from '@/components/ArticleCard';

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
            <Text style={styles.title}>
                Saved Articles
            </Text>
            <View style={styles.divider}></View>

            <View>
                {Array.isArray(savedArticles) && savedArticles.length > 0 && user ? (
                savedArticles.map((item, index) => (
                    <ArticleCard
                    key={index}
                    title={item.title}
                    link={item.link}
                    author={item.author}
                    pubDate={item.pubDate}
                    description={item.description}
                    saved={true}
                    showSavedIcon={true}
                    onSave={() => removeArticle(item)}
                    onShare={() => {
                        // TODO: Implement share functionality
                        console.log('Share article:', item.title);
                    }}
                    />
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