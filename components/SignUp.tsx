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
import { ThemedView } from '@/components/ThemedView';
import { auth, db } from '@/firebase';
import { set, ref } from 'firebase/database';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const Sign_Up = ({ setUser }) => {
    const [password1, setPassword1] = useState(''); //for typing in password
    const [password2, setPassword2] = useState(''); //for confirming password
    const [showPassword1, setShowPassword1] = useState(false); //showing password1
    const [showPassword2, setShowPassword2] = useState(false); //show password2
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //this is to require all the fields to be filled out before the user signs up
    const validatingForm = () => {
        if(!password1 || !password2 || !email || !firstName || !lastName){
            setErrorMessage("Please fill in all fields");
            return false;
        }
        if(password1.length < 10){
            setErrorMessage("Password must be at least 10 characters long.");
            return false;
        }
        if(password1 !== password2){
            setErrorMessage("Passwords do not match.");
            return false;
        }
        return true; //returning true if everything follows requirements
    };

    //this is for updating user profile
    const setDisplayName = async (firstName, lastName) => {
        await updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`
        });
    };

    const signUp = async() => {
        //stopping signUp function if validating form returns false
        if(!validatingForm()){
            return;
        } 

        try {
            //creating account in Authentication
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password1);

            //adding displayName
            await setDisplayName(firstName, lastName);

            //forcing refresh to ensure I get the displayName
            await userCredentials.user.reload();
            console.log("Updated displayName in comp:", auth.currentUser.displayName); //includes displayName

            const updatedUser = auth.currentUser; //get fresh data
            
            setUser({...updatedUser}); //tells React that it is a new object and to re render
            //creating the user into the Realtime Database

            //set ref db pathname
            await set(ref(db, 'users/' + userCredentials.user.uid), {
                //everything that you want stored
                email: userCredentials.user.email,
                firstName: firstName,
                lastName: lastName,
                createdAt: new Date().toISOString()
            });

            //clearing the text fields
            setPassword1('');
            setPassword2('');
            setEmail('');
            setFirstName('');
            setLastName('');
        } catch(error) {
            if(error.code === "auth/weak-password"){
                setErrorMessage("Password is too weak. Create a stronger password.");
            } else if(error.code === "auth/email-already-in-use"){
                setErrorMessage("Sorry! Email already in use");
            } else {
                setErrorMessage("An error occured. Please try again.");
            }
        }
       
    };

    return (
        <ScrollView style={styles.container}>
        <ThemedView>
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
                    placeholder="Confirm password..."
                    placeholderTextColor='#000000'
                    secureTextEntry={!showPassword2}
                    value={password2}
                    onChangeText={setPassword2}
                />
                <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
                    <Text style={styles.message}>
                        {showPassword2 ? 'Hide' : 'Show'} Password
                    </Text>
                </TouchableOpacity>
                {errorMessage !== '' && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                    //referencing the errorMessage state and what it is set to
                )}
                <Button
                    title="Sign Up"
                    onPress={signUp}
                />
            </View>
        </ThemedView>
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