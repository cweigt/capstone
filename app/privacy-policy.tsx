import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
 } from 'react-native';
import { router } from 'expo-router';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { Image } from 'react-native';
import { LegalStyles as styles } from '@/styles/Legal.styles';

const PrivacyPolicy = () => {
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
          Privacy Policy
        </Text>
        
        <ScrollView>
          <Text style={styles.content}>
            This is a placeholder for the Privacy Policy. The actual content will be added here.
          </Text>
        </ScrollView>
      </View>
    </ParallaxScrollView>
  );
};

export default PrivacyPolicy; 