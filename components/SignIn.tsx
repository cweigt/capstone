import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity 
} from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
// import { ThemedView } from '@/components/ThemedView';

const Sign_In = ({ setUser }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = getAuth();

    const signIn = async() => {
        try {
            //creating account in Authentication
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredentials.user);
            //clearing the text fields
            setErrorMessage('');
            setPassword('');
            setEmail('');

        } catch (error) {
            setErrorMessage('Invalid email or password.');
        }
    };

    const sendPasswordEmail = async() => {
        try {
            //sending password reset email
            await sendPasswordResetEmail(auth, email);
            window.alert('Password reset email sent! Please check your inbox.');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error sending reset email. Please try again.');
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Sign In</Text>
                    <Text style={styles.requirements}>
                        To reset your password, enter your email address and click, "Reset Password".
                    </Text>
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
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text style={styles.message}>
                            {showPassword ? 'Hide' : 'Show'} Password
                        </Text>
                    </TouchableOpacity>
                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}
                    <Button
                        title="Sign In"
                        onPress={signIn}
                    />
                    <Button
                        title="Reset Password"
                        onPress={sendPasswordEmail}
                    />
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
        marginBottom: 10,
    },
});

export default Sign_In;