import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';

const Sign_Up = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

    const SignUp = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredentials.user);
            window.alert('User set:' + userCredentials.user);
        } catch (error) {
            window.alert("Sign-up failed: " + error.message);
        }
    };

    return (
        <ScrollView>
            <ThemedView>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button
                        title="Sign Up"
                        onPress={SignUp}
                    />
                </View>
            </ThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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

export default Sign_Up;
