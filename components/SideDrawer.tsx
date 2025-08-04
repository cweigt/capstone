import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Image,
  StyleSheet
} from 'react-native';

import { IconSymbol } from './ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';
import { sideDrawerStyles as styles } from '@/styles/SideDrawer.styles';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8;

interface SideDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  feedNum?: number;
}

//side drawer animation for open and closing
const SideDrawer: React.FC<SideDrawerProps> = ({ isVisible, onClose, children, feedNum }) => {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(false);
  const { theme, mode } = useTheme();

  //conditional logo selection based on theme
  const getLogoSource = () => {
    if (mode === 'dark') {
      return require('@/assets/images/Aurora_Logo-new-RGB-white_v2.png');
    } else {
      return require('@/assets/images/aurora-wdc.png');
    }
  };

  useEffect(() => {
    if (isVisible) {
      //this is for the opening of the sideDrawer
      setShouldRender(true);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else { //this is for the closing of the sideDrawer
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH, //moves left the amount that it needs to for it to be hidden
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false); //unrendering the component to get rid of the opaque gray
      });
    }
  }, [isVisible]);

  if (!shouldRender) return null; //if there is nothing that needs to be rendered, then don't

  return (
    <View style={styles.overlay}>
      <Animated.View 
        style={[styles.backdrop, { opacity: fadeAnim }]} 
        onTouchEnd={onClose}
      />
      <Animated.View
        style={[
          styles.drawer,
          { 
            transform: [{ translateX }],
            backgroundColor: theme.background,
            shadowColor: theme.text
          }
        ]}
      >
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <View style={styles.headerTop}>
            <Image
              source={getLogoSource()}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol name="chevron.left" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
                      <View style={styles.headerSubtitleContainer}>
              <Text style={[styles.headerSubtitle, { color: theme.text }]}>
                All Feeds {'  '}
                {/*the rendering of the dropdown options happens in the home page…
                that page has the needed information to be able to do so*/}
              </Text>
              <Text style={[styles.headerSubtitleNumber, { color: theme.gray }]}>
                {feedNum /*this tracks how many feeds there are*/}
              </Text>
            </View>
        </View>
        
        <View style={styles.menuContainer}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};


export default SideDrawer; 