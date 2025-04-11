import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { auth, db } from '../firebase';
import { set, ref } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Sign_Up = ({ setUser }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const SignUp = async() => {
        try {
            //creating account in Authentication
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredentials.user);

            //creating the user into the Realtime Database
            //set ref db pathname
            await set(ref(db, 'users/' + userCredentials.user.uid), {
                //everything that you want stored
                email: userCredentials.user.email,
                firstName: firstName,
                lastName: lastName,
                createdAt: new Date().toISOString()
            });

            window.alert('User set:' + userCredentials.user);
            //clearing the text fields
            setPassword('');
            setEmail('');
            setFirstName('');
            setLastName('');

        } catch (error) {
            window.alert("Sign-up failed: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ThemedView>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First name..."
                        placeholderTextColor='#000000'
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last name..."
                        placeholderTextColor='#000000'
                        value={lastName}
                        onChangeText={setLastName}
                    />
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
                        title="Sign Up"
                        onPress={SignUp}
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

export default Sign_Up;