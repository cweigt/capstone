import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform 
} from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase';
import { SignInStyles as styles } from '../styles/SignIn.styles';
import { colors } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Sign_In = ({ setUser }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View style={styles.container}>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Sign In</Text>
                        <Text style={styles.requirements}>
                            To reset your password, enter your email address and click, "Reset Password".
                        </Text>
                        <Text style={[styles.requirements, {marginTop: 10}]}>
                            Email
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <Text style={styles.requirements}>
                            Password
                        </Text>
                        <View style={{ position: 'relative' }}>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
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
                        {errorMessage !== '' && (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        )}
                        <TouchableOpacity 
                            onPress={signIn}
                            style={[{marginTop: 20}]}
                         >
                            <Text style={styles.reset}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[{marginTop: 10}]} 
                            onPress={sendPasswordEmail}
                        >
                            <Text style={styles.reset}>Reset Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setUser(true)}
                        >
                            <Text style={styles.toggleText}>
                                Don't have an account? Sign up.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Sign_In;