import { 
  Text, 
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React from 'react';
import { ProfileStyles as styles } from '@/styles/Profile.styles';
import UploadImage from '@/components/UploadImage';
import NameChange from '@/components/NameChange';
import ResetPassword from '@/components/ResetPassword';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { spacing } from '@/styles/theme';
import DeleteAccountButton from '@/components/DeleteAccountButton';
import { useTheme } from '@/context/ThemeContext';

const Profile = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={[]}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Blue Header */}
        <View style={{ backgroundColor: theme.header, paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ position: 'absolute', top: 60, left: 20, zIndex: 1 }}
          >
            <Text style={{ color: theme.back, fontSize: spacing.md, fontWeight: '600', marginTop: 15 }}>
              ← Back
            </Text>
          </TouchableOpacity>
          <Text style={{ color: theme.text, fontSize: spacing.lg, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>
            Edit Profile
          </Text>
        </View>
        
        {/* White Underline */}
        <View style={{ backgroundColor: theme.border, height: 1 }} />

        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.background, paddingBottom: 0 }}>
          <View style={{ padding: 20, backgroundColor: theme.background }}>


            <Text style={[styles.title, { color: theme.text }]}>
              Profile Information
            </Text>
            <UploadImage />
            <NameChange />
            <View style={[styles.divider, {marginTop: 20, borderBottomColor: theme.border}]} />
            <ResetPassword />
            <DeleteAccountButton/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile; 