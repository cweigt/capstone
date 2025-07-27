import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform,
    Image 
} from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase';
import { SignInStyles as styles } from '../styles/SignIn.styles';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Sign_In = ({ setUser }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { theme, mode } = useTheme();


    //Conditional logo selection based on theme
    const getLogoSource = () => {
        if (mode === 'dark') {
        return require('@/assets/images/Aurora_Logo-new-RGB-white_v2.png');
        } else {
        return require('@/assets/images/aurora-wdc.png');
        }
    };
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
            style={{ flex: 1, backgroundColor: theme.background }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            {/* Blue Header */}
            <View style={[{ backgroundColor: theme.header }, styles.heading]}>
                <Image
                source={getLogoSource()}
                style={styles.headerLogo}
                resizeMode="contain"
                />
            </View>
            {/* White Underline */}
        <View style={{ backgroundColor: theme.white, height: 1 }} />

            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={[styles.formContainer, { backgroundColor: theme.background }]}>
                    <Text style={[styles.title, { color: theme.text }]} allowFontScaling={true}>Welcome Back</Text>
                    <Text style={[styles.subtitle, { color: theme.text }]} allowFontScaling={true}>
                        Login to your account
                    </Text>
                    <Text style={[styles.requirements, {color: theme.text}]} allowFontScaling={true}>
                        Email
                    </Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholderTextColor={theme.gray}
                        accessible={true}
                        accessibilityLabel="Email address"
                        accessibilityHint="Enter your email address"
                    />
                    <Text style={[styles.requirements, { color: theme.text }]} allowFontScaling={true}>
                        Password
                    </Text>
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor={theme.gray}
                            accessible={true}
                            accessibilityLabel="Password"
                            accessibilityHint="Enter your password"
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

                    {errorMessage ? (
                        <Text style={[styles.errorText, { color: theme.error }]} allowFontScaling={true}>
                            {errorMessage}
                        </Text>
                    ) : null}

                    <TouchableOpacity
                        onPress={sendPasswordEmail}
                        accessible={true}
                        accessibilityLabel="Reset password"
                        accessibilityHint="Sends a password reset email"
                    >
                        <Text style={[styles.forgot, { color: theme.text }]}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                    <View style={{marginTop: 60}}/>

                    <TouchableOpacity
                        style={[styles.signInButton, { backgroundColor: theme.primary, borderColor: theme.border, marginTop: 10 }]}
                        onPress={signIn}
                        accessible={true}
                        accessibilityLabel="Sign in"
                        accessibilityHint="Signs in with the provided email and password"
                    >
                        <Text style={[styles.buttonText, { color: theme.white }]}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                    
                    {/* 
                    <TouchableOpacity
                        onPress={() => setUser(true)}
                        accessible={true}
                        accessibilityLabel="Sign Up"
                        accessibilityHint="Go to the sign up screen"
                    >
                        <Text style={[styles.toggleText, { color: theme.primary }]} allowFontScaling={true}>
                            Don't have an account? Sign up.
                        </Text>
                    </TouchableOpacity>
                    */}
                    
                    <Text style={[styles.toggleText, { color: theme.primary }]} allowFontScaling={true}>
                        Access to this application is restricted to authorized users.
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Sign_In;