import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { legalStyles as styles } from '@/styles/Legal.styles';

// Replace placeholders as needed
const COMPANY_NAME = 'Aurora WDC';
const EFFECTIVE_DATE = 'June 23, 2025';
const CONTACT_EMAIL = 'breakthrough@aurorawdc.com';
const DPO_CONTACT = 'dpo@aurorawdc.com';

export const Privacy_Policy: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title2}>Privacy Policy</Text>
      <Text style={styles.paragraph}>Effective Date: {EFFECTIVE_DATE}</Text>

      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.paragraph}>
        {COMPANY_NAME} ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App").
      </Text>

      <Text style={styles.sectionTitle}>2. Information We Collect</Text>
      <Text style={styles.paragraph}>
        We may collect information, including but not limited to:
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>• Personal Data: Information you provide directly (e.g., name, email) when signing up or contacting support.</Text>
        <Text style={styles.listItem}>• Usage Data: Automatically collected data regarding how you access and use the App (e.g., device type, OS version, pages viewed, time spent).</Text>
        <Text style={styles.listItem}>• Saved Articles Data: Information about articles you choose to save within the App.</Text>
        <Text style={styles.listItem}>• Third-Party Data: Information from third-party services if you choose to link or sign in via such services.</Text>
      </View>

      <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        We use the collected information to:
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>• Provide, operate, and maintain the App’s features, including news feeds and saved articles.</Text>
        <Text style={styles.listItem}>• Improve, personalize, and expand our App.</Text>
        <Text style={styles.listItem}>• Communicate with you, including responding to inquiries or sending updates.</Text>
        <Text style={styles.listItem}>• Monitor usage and detect technical issues.</Text>
      </View>

      <Text style={styles.sectionTitle}>4. Sharing of Information</Text>
      <Text style={styles.paragraph}>
        We may share your information:
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>• To comply with legal obligations or protect rights.</Text>
        <Text style={styles.listItem}>• With your consent or at your direction.</Text>
      </View>

      <Text style={styles.sectionTitle}>5. Security</Text>
      <Text style={styles.paragraph}>
        We implement reasonable security measures to protect your information. However, no transmission over the Internet is completely secure.
      </Text>

      <Text style={styles.sectionTitle}>6. Children’s Privacy</Text>
      <Text style={styles.paragraph}>
        The App is not intended for children under 13. We do not knowingly collect information from children under 13.
      </Text>

      <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy from time to time. We will notify you of changes by posting the new Privacy Policy with an updated Effective Date.
      </Text>

      <Text style={styles.sectionTitle}>8. Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have questions or comments about this Privacy Policy, please contact Data Protection Officer at {DPO_CONTACT}.
      </Text>
    </ScrollView>
  );
};