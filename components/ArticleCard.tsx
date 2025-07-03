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
        <Text style={styles.cardSource}>{author || 'Source'}</Text>
        <Text style={styles.cardDate}>{new Date(pubDate).toLocaleDateString()}</Text>
      </View> 
      <Text style={styles.cardTitle}>{title}</Text>
      
      {description && (
        <Text style={styles.cardDescription} numberOfLines={3}>
          {description}
        </Text>
      )}

      <View style={styles.cardActionRow}>
        {showSavedIcon && onSave && (
          <TouchableOpacity style={styles.actionButton} onPress={onSave}
          accessibilityLabel='Unsave/Save article'
          accessibilityRole='button'
          >
            <Icon
              name={saved ? 'star' : 'star-outline'}
              color={saved ? colors.saveIconActive : colors.gray}
            />
            <Text style={[styles.actionLabel, { color: saved ? colors.text : colors.gray }]}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton} //onPress={onShare}
          onPress={() => Alert.alert('This feature is currently in development!')}
          accessibilityLabel='Share Article'
          accessibilityRole='button'
        >
          <Icon name="share" type="feather" color={colors.gray} />
          <Text style={styles.actionLabel}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleOpenLink(link)}
          accessibilityLabel='View article'
          accessibilityRole='link'
          >
          <Text style={styles.viewLabel}>View</Text>
          <Icon name="external-link" type="feather" color={colors.accentBlue || colors.primary} size={18} style={{ marginLeft: spacing.xs }} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default ArticleCard; 