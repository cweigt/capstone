import { 
  Text, 
  Image, 
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { SavedArticlesStyles as styles } from '@/styles/SavedArticles.styles';
import { AccountStyles as accountStyles } from '@/styles/Account.styles';
import { router } from 'expo-router';
import { ROUTES } from '@/constants/Routes';

const Legal = () => {
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
          Legal Information
        </Text>
        <TouchableOpacity 
          onPress={() => router.push(ROUTES.EULA)}
          style={{ marginBottom: 10 }}
        >
          <Text style={accountStyles.links}>End User License Agreement</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => router.push(ROUTES.PRIVACY_POLICY)}
          style={{ marginBottom: 10 }}
        >
          <Text style={accountStyles.links}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
};

export default Legal; 