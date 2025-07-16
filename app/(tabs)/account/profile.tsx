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

const Profile = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <TouchableOpacity 
                onPress={() => router.back()}
              >
                <Text style={styles.back}>← Back</Text>
              </TouchableOpacity>
              
              <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 55 }}>
                <Text style={[styles.title, { paddingTop: spacing.sm }]}>
                  Edit Profile
                </Text>
              </View>
            </View>
            <View style={styles.divider} />

            <Text style={styles.title}>
              Profile Information
            </Text>
            <UploadImage />
            <NameChange />
            <View style={[styles.divider, {marginTop: 20}]} />
            <ResetPassword />
            <DeleteAccountButton/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile; 