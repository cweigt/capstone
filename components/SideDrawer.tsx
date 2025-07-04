import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { colors } from '@/styles/theme';
import { sideDrawerStyles as styles } from '@/styles/SideDrawer.styles';
import { IconSymbol } from './ui/IconSymbol';

interface FeedOption {
  label: string;
  value: string;
}

interface SideDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  feedOptions: FeedOption[];
  selectedFeed: string;
  onFeedSelect: (feed: string) => void;
  feedNum;
}

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8;

const SideDrawer: React.FC<SideDrawerProps> = ({ 
  isVisible, 
  onClose, 
  feedOptions, 
  selectedFeed, 
  onFeedSelect,
  feedNum,
}) => {
  //const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const slideAnim = React.useRef(new Animated.Value(isVisible ? -DRAWER_WIDTH : 0)).current;
  const [shouldRender, setShouldRender] = useState(isVisible);


  useEffect(() => {
    if (isVisible) { //when true, drawer becomes visible
      setShouldRender(true); //says that this component is in the vDOM tree
      Animated.timing(slideAnim, { //controls horizontal position
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH, //closing 
        duration: 250,
        useNativeDriver: true,
      }).start(() => setShouldRender(false)); //after animation finishes, then component unmounts… avoids overlay
    }
  }, [isVisible, slideAnim]);

  const handleFeedSelect = (feed: string) => {
    onFeedSelect(feed);
    //Keep drawer open while feed loads, user can close it when they want to for flexibility 
  };

  if (!shouldRender) return null;

  return (
    <View style={styles.overlay} pointerEvents={isVisible ? 'auto' : 'none'}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <Animated.View //animated for a smoother transition
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image 
              source={require('@/assets/images/aurora-wdc.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerSubtitleContainer}>
            <Text style={styles.headerSubtitle}>
              All Feeds{'  '}
            </Text>
            <Text style={styles.headerSubtitleNumber}>
              {feedNum /*this allows for the number of feeds to be dynamically updated*/} 
            </Text>
          </View>
        </View>
        
        <View style={styles.menuContainer}>
          {feedOptions.length > 0 ? (
            feedOptions.map((feed, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  selectedFeed === feed.value && styles.selectedMenuItem
                ]}
                onPress={() => handleFeedSelect(feed.value)}
                activeOpacity={1}
              >
                <Text style={[
                  styles.menuText,
                  selectedFeed === feed.value && styles.selectedMenuText
                ]}>
                  {feed.label}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.menuText}>No feeds available</Text>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default SideDrawer; 