import { 
    StyleSheet, 
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
// import { ThemedView } from '@/components/ThemedView';

const Reset_Password = () => {
    const auth = getAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordReset, setShowPasswordReset] = useState(false);


    const reauthenticate = async() => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            oldPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        //calling updatePassword once the user is authenticated
        await updatePassword(auth.currentUser, newPassword);
        window.alert(`Password has been reset for ${auth.currentUser.email}`);
    }
    
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.formContainer}>
                <TouchableOpacity onPress={() => setShowPasswordReset(!showPasswordReset)}>
                    <Text style={styles.toggleText}>
                        {showPasswordReset ? 'Hide' : 'Show'} Password Reset Form
                    </Text>
                </TouchableOpacity>
                    {showPasswordReset ? (
                        <>
                            <Text style={styles.requirements}>
                                Reset your password below by entering your old and new password.
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Old Password..."
                                placeholderTextColor='#000000'
                                secureTextEntry={!showPasswordOld}
                                value={oldPassword}
                                onChangeText={setOldPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPasswordOld(!showPasswordOld)}>
                                <Text style={styles.message}>
                                    {showPasswordOld ? 'Hide' : 'Show'} Password
                                </Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="New Password..."
                                placeholderTextColor='#000000'
                                secureTextEntry={!showPasswordNew}
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPasswordNew(!showPasswordNew)}>
                                <Text style={styles.message}>
                                    {showPasswordNew ? 'Hide' : 'Show'} Password
                                </Text>
                            </TouchableOpacity>
                            <Button 
                                title="Reset Passsword"
                                onPress={reauthenticate}
                            />
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        marginTop: 7,
    },
    message: {
        fontSize: 12,
        textAlign: 'left',
        //marginTop: 20,
        color: '#666',
    },
    requirements: {
        fontSize: 12,
        color: '#666',
        marginBottom: 0,
        marginTop: 20,
        marginHorizontal: 16,
        textAlign: 'center',
    },
    toggleText: {
    marginTop: 0,
    marginBottom: 10,
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: '500',
    },
});

export default Reset_Password;