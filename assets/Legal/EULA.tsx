import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { legalStyles as styles } from '@/styles/Legal.styles';
import { useTheme } from '@/context/ThemeContext';

// Replace placeholders as needed
const COMPANY_NAME = 'Aurora WDC';
const EFFECTIVE_DATE = 'June 23, 2025';
const CONTACT_EMAIL = 'breakthrough@aurorawdc.com';
const DPO_CONTACT = 'dpo@aurorawdc.com';

export const EULA_: React.FC = () => {
    const { theme } = useTheme();
    
    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.title2, { color: theme.text }]}>End User License Agreement (EULA)</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>Effective Date: {EFFECTIVE_DATE}</Text>
  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>1. License</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          {COMPANY_NAME} grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the App strictly in accordance with this EULA.
        </Text>
  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>2. Restrictions</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          You agree not to:
        </Text>
        <View style={styles.listContainer}>
          <Text style={[styles.listItem, { color: theme.text }]}>• Copy, modify, or create derivative works of the App.</Text>
          <Text style={[styles.listItem, { color: theme.text }]}>• Reverse engineer, decompile, or disassemble the App.</Text>
          <Text style={[styles.listItem, { color: theme.text }]}>• Sell, rent, lease, distribute, or transfer the App.</Text>
          <Text style={[styles.listItem, { color: theme.text }]}>• Use the App for unlawful or unauthorized purposes.</Text>
        </View>
  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>3. Intellectual Property</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          All rights, title, and interest in and to the App (excluding content provided by users) are and will remain the exclusive property of {COMPANY_NAME} and its licensors.
        </Text>
  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>4. Updates</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          {COMPANY_NAME} may provide updates or new versions of the App, which are subject to this EULA unless otherwise specified.
        </Text>
  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>5. Termination</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          This EULA is effective until terminated. Your rights under this EULA will terminate automatically if you fail to comply with any term.
        </Text>
  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>6. Disclaimer of Warranties</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          The App is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. {COMPANY_NAME} disclaims all warranties to the fullest extent permitted by law.
        </Text>
  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>7. Limitation of Liability</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          To the maximum extent permitted by law, {COMPANY_NAME} shall not be liable for any indirect, incidental, special, consequential or punitive damages arising out of or related to your use of the App.
        </Text>
  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>8. Governing Law</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          This EULA shall be governed by and construed in accordance with the laws of the jurisdiction in which {COMPANY_NAME} is established, without regard to conflict of law provisions.
        </Text>
  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>9. Contact Information</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          For any questions about this EULA, contact Data Protection Officer at {DPO_CONTACT}.
        </Text>
      </ScrollView>
    );
  };