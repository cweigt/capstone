import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Sign_In = ({ user, setUser }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const SignIn = async() => {
        try {
            //creating account in Authentication
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredentials.user);

            window.alert('Sign-in succesful!:' + userCredentials.user);
            //clearing the text fields
            setPassword('');
            setEmail('');

        } catch (error) {
            window.alert("Sign-in failed: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ThemedView>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Sign In</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email..."
                        placeholderTextColor='#000000'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password..."
                        placeholderTextColor='#000000'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button
                        title="Sign In"
                        onPress={SignIn}
                    />
                </View>
            </ThemedView>
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
        marginBottom: 10,
        paddingLeft: 8,
    },
});

export default Sign_In;