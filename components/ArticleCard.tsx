/*
  @component: ArticleCard
  @description: displays feed information in a card like style from an external XML file

  @prop {string} title: brings in the title of the article
  @prop {string} link: the link for viewing the article in the in app browser
  @prop {string} author: the source/author of the article
  @prop {string} pubDate: the date in which the article was published
  @prop {string} description?: short article explanation
  @prop {boolean} saved?: article saved status or not, detemrines whether it is in saved articles
  @prop {function} onSave?: takes in the toggleSave function and is used to change saved state
  @prop {function} onShare?: placeholder for any future share actions, currently takes nothing

  @example… from app/(tabs)/index.tsx
  <ArticleCard
    title= Citi CEO Visits Mexico During Banamex Stake Talks, Bloomberg News Reports
    link= https://srnnews.com/citi-ceo-visits-mexico-during-banamex-stake-talks-bloomberg-news-reports/
    author= SRN News
    pubDate= Tue, 12 Aug 2025 08:00:08 +0000
    description= -Citigroup CEO Jane Fraser is in Mexico City for talks with President Claudia Sheinbaum that include the
      potential public listing of the bank's retail unit Banamex, Bloomberg News reported on Monday, citing people familiar with the matter.

    saved= {true}
    showSavedIcon= {true}
    onSave={() => toggleSave(item)}
    onShare={() => {}}
  />
*/

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert,
} from 'react-native';
import { Card } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { RSSFeedStyles as styles } from '@/styles/RSSFeed.styles';
import { spacing } from '@/styles/theme';
import { useTheme } from '@/context/ThemeContext';
import * as WebBrowser from 'expo-web-browser';
//this is displayed in both the home page and the saved articles page

interface ArticleCardProps {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description?: string;
  saved?: boolean;
  onSave?: () => void;
  onShare?: () => void;
  showSavedIcon?: boolean;
}

//this opens the link in the in app browser for a more user friendly experience
const handleOpenLink = async (url) => {
  await WebBrowser.openBrowserAsync(url);
};

//everything that each card will use in some way
//this is the exported function as well that is used
const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  link,
  author,
  pubDate,
  description,
  saved = false,
  onSave,
  onShare,
  showSavedIcon = true,
}) => {
  const { theme } = useTheme();

  //this is the card itself
  return (
    <Card containerStyle={[styles.card, { backgroundColor: theme.background }]}>
      <View style={styles.cardHeaderRow}>
        <Text style={[styles.cardSource, { color: theme.cardIcons }]} allowFontScaling={true}>{author || 'Source'}</Text>
        <Text style={[styles.cardDate, { color: theme.cardIcons }]} allowFontScaling={true}>{new Date(pubDate).toLocaleDateString()}</Text>
      </View> 
      <Text style={[styles.cardTitle, { color: theme.text }]} allowFontScaling={true}>{title}</Text>
      
      {description && (
        <Text style={[styles.cardDescription, { color: theme.text }]} numberOfLines={3} allowFontScaling={true}>
          {description}
        </Text>
      )}

      <View style={styles.cardActionRow}>
        {showSavedIcon && onSave && (
          <TouchableOpacity style={styles.actionButton} onPress={onSave}
            accessible={true}
            accessibilityLabel={saved ? 'Unsave article' : 'Save article'}
            accessibilityHint={saved ? 'Removes this article from your saved list' : 'Saves this article to your saved list'}
            accessibilityRole='button'
          >
            <Icon
              name={saved ? 'star' : 'star-outline'}
              color={saved ? theme.saveIconActive : theme.cardIcons}
            />
            <Text style={[styles.actionLabel, { color: saved ? theme.text : theme.cardIcons }]} allowFontScaling={true}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        )}
        {/*there is a share option when opening the article in the in app web browser, this could be something to delete in the future*/}
        <TouchableOpacity style={styles.actionButton}
          onPress={() => Alert.alert('This feature is currently in development!')}
          accessible={true}
          accessibilityLabel="Share article"
          accessibilityHint="Shares this article"
          accessibilityRole='button'
        >
          <Icon name="share" type="feather" color={theme.cardIcons} />
          <Text style={[styles.actionLabel, { color: theme.cardIcons }]} allowFontScaling={true}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleOpenLink(link)}
          accessible={true}
          accessibilityLabel="View article"
          accessibilityHint="Opens the article in the browser"
          accessibilityRole='link'
        >
          <Text style={[styles.viewLabel, { color: theme.cardIcons }]} allowFontScaling={true}>View</Text>
          <Icon name="external-link" type="feather" color={theme.accentBlue || theme.primary} size={20} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default ArticleCard; 