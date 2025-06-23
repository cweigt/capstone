import { 
    ScrollView, 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
 } from 'react-native';
import React, { useState } from 'react';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { SignUpStyles as styles } from '../styles/SignUp.styles';
import { colors } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
    const database = getDatabase();
    const router = useRouter();

    const signUp = async() => {
        try {
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

            const userCredentials = await createUserWithEmailAndPassword(auth, email, password1);
            
            // Update user profile
            await updateProfile(userCredentials.user, {
                displayName: `${firstName} ${lastName}`
            });

            // Store user data in Realtime Database
            await set(ref(database, `users/${userCredentials.user.uid}`), {
                email: email,
                firstName: firstName,
                lastName: lastName,
                displayName: `${firstName} ${lastName}`,
                createdAt: new Date().toISOString(),
                photoURL: null
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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
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
                        <Text style={styles.requirements}>
                            First name
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <Text style={styles.requirements}>
                            Last name
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        <Text style={styles.requirements}>
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
                        <View style={{position: 'relative'}}>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={!showPassword1}
                                value={password1}
                                onChangeText={setPassword1}
                            />
                            <TouchableOpacity 
                                onPress={() => setShowPassword1(!showPassword1)}
                                style={styles.eye}
                            >
                                <Ionicons
                                    name={showPassword1 ? 'eye-off' : 'eye'}
                                    size={22}
                                    color={colors.gray}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.requirements}>
                            Confirm Password
                        </Text>
                        <View style={{position: 'relative'}}>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={!showPassword2}
                                value={password2}
                                onChangeText={setPassword2}
                            />
                            <TouchableOpacity 
                                onPress={() => setShowPassword2(!showPassword2)}
                                style={styles.eye}
                            >
                                <Ionicons
                                    name={showPassword2 ? 'eye-off' : 'eye'}
                                    size={22}
                                    color={colors.gray}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity 
                            style={[{marginTop: 20}]} 
                            onPress={signUp}
                        >
                            <Text style={styles.reset}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setUser(false)}
                        >
                            <Text style={styles.toggleText}>
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