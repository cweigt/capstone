import { 
    ScrollView, 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
 } from 'react-native';
import React, { useState } from 'react';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { SignUpStyles as styles } from '../styles/SignUp.styles';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Sign_Up = ({ setUser }) => {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const database = getDatabase();
    const router = useRouter();
    const { theme } = useTheme();

    const signUp = async() => {
        try {
            //these are all the password checks to make sure it meets criteria
            if (password1 !== password2) {
                setErrorMessage('Passwords do not match.');
                return;
            }

            else if(password1.length < 10) {
                setErrorMessage('Password must be at least 10 characters long.');
                return;
            }

            else if(!/[A-Z]/.test(password1)) {
                setErrorMessage('Password must contain at least one uppercase letter.');
                return;
            }

            else if(!/[a-z]/.test(password1)) {
                setErrorMessage('Password must contain at least one lowercase letter.');
                return;
            }

            else if(!/[0-9]/.test(password1)) {
                setErrorMessage('Password must contain at least one number.');
                return;
            }

            else if(!/[!@#$%^&*(),.?":{}|<>]/.test(password1)) {
                setErrorMessage('Password must contain at least one special character.');
                return;
            } 

            //tries to create the account once the password meets all checks
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password1);
            
            //update user profile
            //for whatever reason, this needed to be explicity defined and written for it to work
            //this udpates in Auth
            await updateProfile(userCredentials.user, {
                displayName: `${firstName} ${lastName}`
            });

            //store user data in Realtime Database
            await set(ref(database, `users/${userCredentials.user.uid}`), {
                email: email,
                firstName: firstName,
                lastName: lastName,
                displayName: `${firstName} ${lastName}`,
                createdAt: new Date().toISOString(),
                photoURL: null //defaulting to null because obviously there is nothing there in the user account
            });

            setUser(userCredentials.user); //automatically signs the user in after account creation
            setErrorMessage('');
            setPassword1('');
            setPassword2('');
            setEmail('');
            setFirstName('');
            setLastName('');
        } catch (error) {
            setErrorMessage(error.message || 'Error creating account. Please try again.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: theme.background }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            {/* Blue Header */}
            <View style={{ backgroundColor: theme.header, paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 }}>
                <Text style={{ color: theme.text, fontSize: 24, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>
                    Sign Up
                </Text>
            </View>
            <View style={{ backgroundColor: theme.border, height: 1 }} />

            <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={{ backgroundColor: theme.background }}>
                    <View style={[styles.formContainer, { backgroundColor: theme.background }]}>
                        <Text style={[styles.title, { color: theme.text }]} allowFontScaling={true}>Create Account</Text>
                        <Text style={[styles.requirements, { color: theme.text }]} allowFontScaling={true}>
                            Password must be:
                            At least 10 characters long.
                            At least one uppercase letter.
                            At least one lowercase letter.
                            At least one number.
                            At least one special character.
                        </Text>
                        <Text style={[styles.requirements, { color: theme.text }]} allowFontScaling={true}>
                            First name
                        </Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholderTextColor={theme.gray}
                            accessible={true}
                            accessibilityLabel="First name"
                            accessibilityHint="Enter your first name"
                        />
                        <Text style={[styles.requirements, { color: theme.text }]} allowFontScaling={true}>
                            Last name
                        </Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholderTextColor={theme.gray}
                            accessible={true}
                            accessibilityLabel="Last name"
                            accessibilityHint="Enter your last name"
                        />
                        <Text style={[styles.requirements, { color: theme.text }]} allowFontScaling={true}>
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
                        <View style={{position: 'relative'}}>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                                secureTextEntry={!showPassword1}
                                value={password1}
                                onChangeText={setPassword1}
                                placeholderTextColor={theme.gray}
                                accessible={true}
                                accessibilityLabel="Password"
                                accessibilityHint="Enter your password"
                            />
                            <TouchableOpacity 
                                onPress={() => setShowPassword1(!showPassword1)}
                                style={styles.eye}
                                accessible={true}
                                accessibilityLabel={showPassword1 ? 'Hide password' : 'Show password'}
                                accessibilityHint="Toggles password visibility"
                            >
                                <Ionicons
                                    name={showPassword1 ? 'eye-off' : 'eye'}
                                    size={22}
                                    color={theme.gray}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.requirements, { color: theme.text }]} allowFontScaling={true}>
                            Confirm Password
                        </Text>
                        <View style={{position: 'relative'}}>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
                                secureTextEntry={!showPassword2}
                                value={password2}
                                onChangeText={setPassword2}
                                placeholderTextColor={theme.gray}
                                accessible={true}
                                accessibilityLabel="Confirm password"
                                accessibilityHint="Re-enter your password"
                            />
                            <TouchableOpacity 
                                onPress={() => setShowPassword2(!showPassword2)}
                                style={styles.eye}
                                accessible={true}
                                accessibilityLabel={showPassword2 ? 'Hide password' : 'Show password'}
                                accessibilityHint="Toggles password visibility"
                            >
                                <Ionicons
                                    name={showPassword2 ? 'eye-off' : 'eye'}
                                    size={22}
                                    color={theme.gray}
                                />
                            </TouchableOpacity>
                        </View>
                        {errorMessage ? (
                            <Text style={[styles.errorText, { color: theme.error }]} allowFontScaling={true}>{errorMessage}</Text>
                        ) : null}
                        <TouchableOpacity 
                            style={[styles.signUpButton, { backgroundColor: theme.containerColor, borderColor: theme.border, marginBottom: 10 }]} 
                            onPress={signUp}
                            accessible={true}
                            accessibilityLabel="Sign Up"
                            accessibilityHint="Creates a new account"
                        >
                            <Text style={[styles.buttonText, { color: theme.text }]}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setUser(false)}
                            accessible={true}
                            accessibilityLabel="Sign In"
                            accessibilityHint="Go to the sign in screen"
                        >
                            <Text style={[styles.toggleText, { color: theme.primary }]} allowFontScaling={true}>
                                Already have an account? Sign in.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Sign_Up;