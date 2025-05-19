import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity 
} from 'react-native';
import React, { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
//import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Sign_In = ({ setUser }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const signIn = async() => {
        try {
            //creating account in Authentication
            //const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            //setUser(userCredentials.user);
            setErrorMessage('');
            //clearing the text fields
            setPassword('');
            setEmail('');

        } catch (error) {
            setErrorMessage('Invalid email or password.');
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
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text style={styles.message}>
                            <Text style={styles.message}>
                                {showPassword ? 'Hide' : 'Show'} Password
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}
                    <Button
                        title="Sign In"
                        onPress={signIn}
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
});

export default Sign_In;