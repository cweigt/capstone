import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
 } from 'react-native';
import { router } from 'expo-router';
import { legalStyles as styles } from '@/styles/Legal.styles';
import { LegalCommonStyles as legalStyles } from '@/styles/LegalCommon.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Privacy_Policy } from '@/assets/Legal/Policy';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={legalStyles.container} edges={['top']}>
    <ScrollView>
      <View style={{ padding: 20 }}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={{ marginBottom: 20 }}
        >
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        
        <Privacy_Policy />
        
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy; 