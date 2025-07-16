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
import { colors, spacing } from '@/styles/theme';
import * as WebBrowser from 'expo-web-browser';

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

const handleOpenLink = async (url) => {
  await WebBrowser.openBrowserAsync(url);
};

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
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardSource} allowFontScaling={true}>{author || 'Source'}</Text>
        <Text style={styles.cardDate} allowFontScaling={true}>{new Date(pubDate).toLocaleDateString()}</Text>
      </View> 
      <Text style={styles.cardTitle} allowFontScaling={true}>{title}</Text>
      
      {description && (
        <Text style={styles.cardDescription} numberOfLines={3} allowFontScaling={true}>
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
              color={saved ? colors.saveIconActive : colors.gray}
            />
            <Text style={[styles.actionLabel, { color: saved ? colors.text : colors.gray }]} allowFontScaling={true}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton}
          onPress={() => Alert.alert('This feature is currently in development!')}
          accessible={true}
          accessibilityLabel="Share article"
          accessibilityHint="Shares this article"
          accessibilityRole='button'
        >
          <Icon name="share" type="feather" color={colors.gray} />
          <Text style={styles.actionLabel} allowFontScaling={true}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleOpenLink(link)}
          accessible={true}
          accessibilityLabel="View article"
          accessibilityHint="Opens the article in the browser"
          accessibilityRole='link'
        >
          <Text style={styles.viewLabel} allowFontScaling={true}>View</Text>
          <Icon name="external-link" type="feather" color={colors.accentBlue || colors.primary} size={18} style={{ marginLeft: spacing.xs }} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default ArticleCard; 