import React, { useState } from "react";
import { Alert, TouchableOpacity, Text, Modal, View, TextInput } from "react-native";
import { deleteUser, getAuth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";
//import { AccountStyles as styles } from '@/styles/Account.styles';
import { colors } from "@/styles/theme";
import {DeleteAccountButtonStyles as styles} from '@/styles/DeleteAccountButton.styles';
import { Ionicons } from '@expo/vector-icons';
import {signOut} from "firebase/auth";

const DeleteAccountButton = () => {
    const auth = getAuth();
    const database = getDatabase();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pendingDelete, setPendingDelete] = useState(false);

    const actuallyDeleteAccount = async () => {
        const user = auth.currentUser;
        if (!user) return;
        try {
            //delete all user data
            const userRef = ref(database, `users/${user.uid}`);
            await remove(userRef);
            //Delete Firebase Authentication account
            await deleteUser(user);
            // Sign out the user after deletion
            await signOut(auth);
            // Optionally redirect to login or sign-up screen here
        } catch (error: any) {
            if (error.code === 'auth/requires-recent-login') {
                setShowPasswordModal(true);
                setPendingDelete(true);
            } else {
                Alert.alert('Error', error.message);
            }
        }
    };

    const handleReauthAndDelete = async () => {
        setError("");
        const user = auth.currentUser;
        if (!user || !user.email) {
            setError("User not found or missing email.");
            return;
        }
        try {
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

    // delete confirmation function
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
                style={{ alignItems: 'center', paddingTop: 40 }}
            >
                <Text style={styles.deleteAccount}>Delete Account</Text>
            </TouchableOpacity>
            <Modal
                visible={showPasswordModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowPasswordModal(false)}
            >
                <View style={styles.bkgContainer}>
                    <View style={styles.container}>
                        <Text style={styles.passwordTitle}>Re-enter Password</Text>
                        <Text style={{ marginBottom: 12 }}>For security, please enter your password to confirm account deletion.</Text>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Password..."
                                placeholderTextColor={colors.text}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                autoFocus
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eye}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color={colors.gray}
                                />
                            </TouchableOpacity>
                        </View>
                        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => { setShowPasswordModal(false); setPassword(""); setError(""); setPendingDelete(false); }} style={{ marginRight: 16 }}>
                                <Text style={{color: colors.text}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleReauthAndDelete}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default DeleteAccountButton; 