import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
 } from 'react-native';
import { router } from 'expo-router';
import { LegalStyles as styles } from '@/styles/Legal.styles';
import { LegalCommonStyles as legalStyles } from '@/styles/LegalCommon.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const EULA = () => {
  return (
    <SafeAreaView style={legalStyles.container}>
    <ScrollView>
      <View style={{ padding: 20 }}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={{ marginBottom: 20 }}
        >
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>
          End User License Agreement
        </Text>
        
        <ScrollView>
          <Text style={styles.content}>
            This is a placeholder for the End User License Agreement. The actual content will be added here.
          </Text>
        </ScrollView>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default EULA; 