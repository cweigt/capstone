import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity 
} from 'react-native';
import React, { useState } from 'react';
import { 
    getAuth,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
 } from 'firebase/auth';
import { ResetPasswordStyles as styles } from '../styles/ResetPassword.styles';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/styles/theme';
import { useTheme } from '@/context/ThemeContext';

const Reset_Password = () => {
    const auth = getAuth();
    const { theme } = useTheme();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordNewConfirm, setShowPasswordNewConfirm] = useState(false);

    //this is the same function as shown in deleting an account
    //needs to reauthenticate for resetting the password as well
    const reauthenticate = async() => {
        setError('');
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            oldPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        //calling updatePassword once the user is authenticated
        await updatePassword(auth.currentUser, newPassword);
        window.alert(`Password has been reset for ${auth.currentUser.email}`);

        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }
    
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.formContainer, { backgroundColor: theme.background }]}>
                        <Text style={[styles.requirements, { color: theme.text }]}>
                            Current Password
                        </Text>
                        <View style={{ position: 'relative', marginBottom: spacing.md }}>
                          <TextInput
                              style={[styles.input, { paddingRight: 40, backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                              placeholderTextColor={theme.gray}
                              secureTextEntry={!showPasswordOld}
                              value={oldPassword}
                              onChangeText={setOldPassword}
                              accessibilityLabel="Current Password"
                              accessibilityHint="Enter your current password"
                          />
                          <TouchableOpacity
                            onPress={() => setShowPasswordOld(!showPasswordOld)}
                            style={styles.eye}
                          >
                            <Ionicons
                              name={showPasswordOld ? 'eye-off' : 'eye'}
                              size={22}
                              color={theme.gray}
                            />
                          </TouchableOpacity>
                        </View>

                        <Text style={[styles.requirements, { color: theme.text }]}>
                            New Password
                        </Text>
                        <View style={{ position: 'relative', marginBottom: spacing.md }}>
                          <TextInput
                              style={[styles.input, { paddingRight: 40, backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                              placeholderTextColor={theme.gray}
                              secureTextEntry={!showPasswordNew}
                              value={newPassword}
                              onChangeText={setNewPassword}
                              accessibilityLabel="New Password"
                              accessibilityHint="Enter your new password"
                          />
                          <TouchableOpacity
                            onPress={() => setShowPasswordNew(!showPasswordNew)}
                            style={styles.eye}
                          >
                            <Ionicons
                              name={showPasswordNew ? 'eye-off' : 'eye'}
                              size={22}
                              color={theme.gray}
                            />
                          </TouchableOpacity>
                        </View>

                        <Text style={[styles.requirements, { color: theme.text }]}>
                            Confirm New Password
                        </Text>
                        <View style={{ position: 'relative', marginBottom: spacing.md }}>
                          <TextInput
                              style={[styles.input, { paddingRight: 40, backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                              placeholderTextColor={theme.gray}
                              secureTextEntry={!showPasswordNewConfirm}
                              value={confirmPassword}
                              onChangeText={setConfirmPassword}
                              accessibilityLabel="Confirm new password"
                              accessibilityHint="Reenter your new password"
                          />
                          <TouchableOpacity
                            onPress={() => setShowPasswordNewConfirm(!showPasswordNewConfirm)}
                            style={styles.eye}
                          >
                            <Ionicons
                              name={showPasswordNewConfirm ? 'eye-off' : 'eye'}
                              size={22}
                              color={theme.gray}
                            />
                          </TouchableOpacity>
                        </View>

                        {error ? (
                            <Text style={[styles.errorText, { color: theme.error }]} allowFontScaling={true}>
                                {error}
                            </Text>
                        ) : null}

                        <TouchableOpacity
                            onPress={reauthenticate}
                            accessibilityLabel='Reset Password Button'
                            style={[styles.reset, { backgroundColor: theme.containerColor, borderColor: theme.border }]}
                        >
                            <Text style={[styles.toggleText, { color: theme.text }]} allowFontScaling={true}>
                                Reset Password
                            </Text>
                        </TouchableOpacity>
            </View>
        </View>
    );
};

export default Reset_Password;