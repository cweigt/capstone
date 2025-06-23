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
import { colors } from '@/styles/theme';
// import { ThemedView } from '@/components/ThemedView';

const Reset_Password = () => {
    const auth = getAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordNewConfirm, setShowPasswordNewConfirm] = useState(false);

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
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.formContainer}>
                            <Text style={styles.requirements}>
                                Current Password
                            </Text>
                            <View style={{ position: 'relative', marginBottom: 16 }}>
                              <TextInput
                                  style={[styles.input, { paddingRight: 40 }]}
                                  placeholderTextColor={colors.text}
                                  secureTextEntry={!showPasswordOld}
                                  value={oldPassword}
                                  onChangeText={setOldPassword}
                              />
                              <TouchableOpacity
                                onPress={() => setShowPasswordOld(!showPasswordOld)}
                                style={styles.eye}
                              >
                                <Ionicons
                                  name={showPasswordOld ? 'eye-off' : 'eye'}
                                  size={22}
                                  color={colors.gray}
                                />
                              </TouchableOpacity>
                            </View>

                            <Text style={styles.requirements}>
                                New Password
                            </Text>
                            <View style={{ position: 'relative', marginBottom: 16 }}>
                              <TextInput
                                  style={[styles.input, { paddingRight: 40 }]}
                                  placeholderTextColor={colors.text}
                                  secureTextEntry={!showPasswordNew}
                                  value={newPassword}
                                  onChangeText={setNewPassword}
                              />
                              <TouchableOpacity
                                onPress={() => setShowPasswordNew(!showPasswordNew)}
                                style={styles.eye}
                              >
                                <Ionicons
                                  name={showPasswordNew ? 'eye-off' : 'eye'}
                                  size={22}
                                  color={colors.gray}
                                />
                              </TouchableOpacity>
                            </View>

                            <Text style={[styles.requirements, {marginTop: -10}]}>
                                Confirm New Password
                            </Text>
                            <View style={{ position: 'relative', marginBottom: 16 }}>
                              <TextInput
                                  style={[styles.input, { paddingRight: 40 }]}
                                  placeholderTextColor={colors.text}
                                  secureTextEntry={!showPasswordNewConfirm}
                                  value={confirmPassword}
                                  onChangeText={setConfirmPassword}
                              />
                              <TouchableOpacity
                                onPress={() => setShowPasswordNewConfirm(!showPasswordNewConfirm)}
                                style={styles.eye}
                              >
                                <Ionicons
                                  name={showPasswordNewConfirm ? 'eye-off' : 'eye'}
                                  size={22}
                                  color={colors.gray}
                                />
                              </TouchableOpacity>
                            </View>
                            {error ? <Text style={styles.errorText}>{error}</Text> : null}
                            <TouchableOpacity
                              onPress={reauthenticate}
                            >
                              <Text style={styles.reset}>
                                Reset Password
                              </Text>
                            </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Reset_Password;