import { 
    StyleSheet, 
    ScrollView, 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity,
 } from 'react-native';
import React, { useState } from 'react';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { ThemedView } from '@/components/ThemedView';

const Sign_Up = ({ setUser }) => {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const signUp = async() => {
        try {
            if (password1 !== password2) {
                setErrorMessage('Passwords do not match.');
                return;
            }

            if (password1.length < 10) {
                setErrorMessage('Password must be at least 10 characters long.');
                return;
            }

            if (!/[A-Z]/.test(password1)) {
                setErrorMessage('Password must contain at least one uppercase letter.');
                return;
            }

            if (!/[a-z]/.test(password1)) {
                setErrorMessage('Password must contain at least one lowercase letter.');
                return;
            }

            if (!/[0-9]/.test(password1)) {
                setErrorMessage('Password must contain at least one number.');
                return;
            }

            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password1)) {
                setErrorMessage('Password must contain at least one special character.');
                return;
            }

            const userCredentials = await createUserWithEmailAndPassword(auth, email, password1);
            await updateProfile(userCredentials.user, {
                displayName: `${firstName} ${lastName}`
            });
            setUser(userCredentials.user);
            setErrorMessage('');
            setPassword1('');
            setPassword2('');
            setEmail('');
            setFirstName('');
            setLastName('');
        } catch (error) {
            setErrorMessage('Error creating account. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                    <Text style={styles.requirements}>
                        Password must be:
                        At least 10 characters long.
                        At least one uppercase letter.
                        At least one lowercase letter.
                        At least one number.
                        At least one special character.
                    </Text>
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
                        secureTextEntry={!showPassword1}
                        value={password1}
                        onChangeText={setPassword1}
                    />
                    <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
                        <Text style={styles.message}>
                            {showPassword1 ? 'Hide' : "Show"} Password
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password..."
                        placeholderTextColor='#000000'
                        secureTextEntry={!showPassword2}
                        value={password2}
                        onChangeText={setPassword2}
                    />
                    <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
                        <Text style={styles.message}>
                            {showPassword2 ? 'Hide' : "Show"} Password
                        </Text>
                    </TouchableOpacity>
                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}
                    <Button
                        title="Sign Up"
                        onPress={signUp}
                    />
                </View>
            </View>
        </ScrollView>
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
        marginBottom: 10,
    },
});

export default Sign_Up;