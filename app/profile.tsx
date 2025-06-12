import { 
  Text, 
  Image, 
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { SavedArticlesStyles as styles } from '@/styles/SavedArticles.styles';
import UploadImage from '@/components/UploadImage';
import NameChange from '@/components/NameChange';
import ResetPassword from '@/components/ResetPassword';
import { router } from 'expo-router';

const Profile = () => {
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
          Profile Settings
        </Text>
        <UploadImage />
        <ResetPassword />
        <NameChange />
      </View>
    </ParallaxScrollView>
  );
};

export default Profile; 