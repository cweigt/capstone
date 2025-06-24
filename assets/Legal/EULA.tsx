import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { legalStyles as styles } from '@/styles/Legal.styles';

// Replace placeholders as needed
const COMPANY_NAME = 'Aurora WDC';
const EFFECTIVE_DATE = 'June 23, 2025';
const CONTACT_EMAIL = 'breakthrough@aurorawdc.com';
const DPO_CONTACT = 'dpo@aurorawdc.com';

export const EULA_: React.FC = () => {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title2}>End User License Agreement (EULA)</Text>
        <Text style={styles.paragraph}>Effective Date: {EFFECTIVE_DATE}</Text>
  
        <Text style={styles.sectionTitle}>1. License</Text>
        <Text style={styles.paragraph}>
          {COMPANY_NAME} grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the App strictly in accordance with this EULA.
        </Text>
  
        <Text style={styles.sectionTitle}>2. Restrictions</Text>
        <Text style={styles.paragraph}>
          You agree not to:
        </Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>• Copy, modify, or create derivative works of the App.</Text>
          <Text style={styles.listItem}>• Reverse engineer, decompile, or disassemble the App.</Text>
          <Text style={styles.listItem}>• Sell, rent, lease, distribute, or transfer the App.</Text>
          <Text style={styles.listItem}>• Use the App for unlawful or unauthorized purposes.</Text>
        </View>
  
        <Text style={styles.sectionTitle}>3. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All rights, title, and interest in and to the App (excluding content provided by users) are and will remain the exclusive property of {COMPANY_NAME} and its licensors.
        </Text>
  
        <Text style={styles.sectionTitle}>4. Updates</Text>
        <Text style={styles.paragraph}>
          {COMPANY_NAME} may provide updates or new versions of the App, which are subject to this EULA unless otherwise specified.
        </Text>
  
        <Text style={styles.sectionTitle}>5. Termination</Text>
        <Text style={styles.paragraph}>
          This EULA is effective until terminated. Your rights under this EULA will terminate automatically if you fail to comply with any term.
        </Text>
  
        <Text style={styles.sectionTitle}>6. Disclaimer of Warranties</Text>
        <Text style={styles.paragraph}>
          The App is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. {COMPANY_NAME} disclaims all warranties to the fullest extent permitted by law.
        </Text>
  
        <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          To the maximum extent permitted by law, {COMPANY_NAME} shall not be liable for any indirect, incidental, special, consequential or punitive damages arising out of or related to your use of the App.
        </Text>
  
        <Text style={styles.sectionTitle}>8. Governing Law</Text>
        <Text style={styles.paragraph}>
          This EULA shall be governed by and construed in accordance with the laws of the jurisdiction in which {COMPANY_NAME} is established, without regard to conflict of law provisions.
        </Text>
  
        <Text style={styles.sectionTitle}>9. Contact Information</Text>
        <Text style={styles.paragraph}>
          For any questions about this EULA, contact Data Protection Officer at {DPO_CONTACT}.
        </Text>
      </ScrollView>
    );
  };