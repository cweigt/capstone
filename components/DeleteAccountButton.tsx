/*
  @component: DeleteAccountButton
  @description: handles the delete account process

  @example
  <DeleteAccountButton/>
*/

import React, { useState } from "react";
import { 
    Alert, 
    TouchableOpacity, 
    Text, 
    Modal, 
    View, 
    TextInput 
} from "react-native";
import { deleteUser, getAuth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";
//import { AccountStyles as styles } from '@/styles/Account.styles';
import {DeleteAccountButtonStyles as styles} from '@/styles/DeleteAccountButton.styles';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { useTheme } from '@/context/ThemeContext';

const DeleteAccountButton = () => {
    const auth = getAuth();
    const database = getDatabase();
    const { theme } = useTheme();
    //this modal shows up for the user to enter password if not recently authenticated
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pendingDelete, setPendingDelete] = useState(false);

    //deletes the account off of firebase… both the authentication and realtime database
    //only executes once the user is authenticated 
    const actuallyDeleteAccount = async () => {
        const user = auth.currentUser;
        if (!user) return;
        try {
            //delete all user data
            const userRef = ref(database, `users/${user.uid}`);
            await remove(userRef);
            //delete Firebase Authentication account
            await deleteUser(user);
            //sign out the user after deletion
            await signOut(auth);
        } catch (error: any) {
            if (error.code === 'auth/requires-recent-login') {
                setShowPasswordModal(true);
                setPendingDelete(true);
            } else {
                Alert.alert('Error', error.message);
            }
        }
    };

    //this is handling reauthentication
    const handleReauthAndDelete = async () => {
        setError("");
        const user = auth.currentUser; //takes the email and password
        if (!user || !user.email) {
            setError("User not found or missing email.");
            return;
        }
        try {
            //tries to reauthenticate the user with the email and entered password
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);
            setShowPasswordModal(false);
            setPassword("");
            setPendingDelete(false);
            await actuallyDeleteAccount();
        } catch (err: any) {
            setError(err.message || "Re-authentication failed.");
        }
    };

    //delete confirmation function
    const confirmDelete = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account and all associated data? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: actuallyDeleteAccount },
            ]
        );
    };

    return (
        <>
            <TouchableOpacity
                onPress={confirmDelete}
                style={{ alignItems: 'center', paddingTop: 10 }}
                accessible={true}
                accessibilityLabel="Delete Account"
                accessibilityHint="Deletes your account and all associated data. This action cannot be undone."
            >
                <Text style={[styles.deleteAccount, { 
                  backgroundColor: theme.containerColor,
                  borderColor: theme.border,
                  color: theme.error 
                }]}>Delete Account</Text>
            </TouchableOpacity>
            <Modal
                visible={showPasswordModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowPasswordModal(false)}
            >
                <View style={[styles.bkgContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                    <View style={[styles.container, { backgroundColor: theme.background }]}>
                        <Text style={[styles.passwordTitle, { color: theme.text }]}>Re-enter Password</Text>
                        <Text style={{ marginBottom: 12, color: theme.text }}>For security, please enter your password to confirm account deletion.</Text>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <TextInput
                                style={[styles.modalInput, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                                placeholder="Password..."
                                placeholderTextColor={theme.gray}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                autoFocus
                                accessible={true}
                                accessibilityLabel="Password"
                                accessibilityHint="Type your password in to delete the account."
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eye}
                                accessible={true}
                                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                                accessibilityHint="Toggles password visibility"
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color={theme.gray}
                                />
                            </TouchableOpacity>
                        </View>
                        {error ? <Text style={[styles.errorMessage, { color: theme.error }]}>{error}</Text> : null}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            {/*this gives you an oppurtunity to cancel if you don't remember your password*/}
                            <TouchableOpacity onPress={() => { setShowPasswordModal(false); setPassword(""); setError(""); setPendingDelete(false); }} style={{ marginRight: 16 }}
                                accessible={true}
                                accessibilityLabel="Cancel"
                                accessibilityHint="Cancel account deletion and close the password prompt."
                            >
                                <Text style={{color: theme.text}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleReauthAndDelete}
                                style={{
                                    backgroundColor: theme.error,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 6,
                                }}
                                accessible={true}
                                accessibilityLabel="Delete Account"
                                accessibilityHint="Confirm account deletion after entering your password."
                            >
                                <Text style={{
                                    color: theme.text,
                                    fontWeight: '600',
                                    fontSize: 14,
                                }}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default DeleteAccountButton; 