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
import { EULA_ } from '@/assets/Legal/EULA';
import { useTheme } from '@/context/ThemeContext';
import { spacing } from '@/styles/theme';

const EULA = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={[]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.background }}>
        {/* Blue Header */}
        <View style={{ backgroundColor: theme.header, paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ position: 'absolute', left: 15, zIndex: 1 }}
          >
            <Text style={{ color: theme.back, fontSize: spacing.md, fontWeight: '600', marginTop: 50 }}>
              ← Back
            </Text>
          </TouchableOpacity>
          <Text style={{ color: theme.text, fontSize: spacing.lg, fontWeight: '600', textAlign: 'center', flex: 1 }}>
            End User License Agreement
          </Text>
        </View>
        
        {/* White Underline */}
        <View style={{ backgroundColor: theme.border, height: 1 }} />

        <View style={{ padding: 20, backgroundColor: theme.background, flex: 1 }}>
          <EULA_ />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EULA; 