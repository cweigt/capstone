import { 
  Text, 
  Image, 
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
// import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { SavedArticlesStyles as styles } from '@/styles/SavedArticles.styles';
import UploadImage from '@/components/UploadImage';
import NameChange from '@/components/NameChange';
import ResetPassword from '@/components/ResetPassword';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile; 