import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, Dimensions, Alert, ImageBackground, TextInput } from 'react-native';
import commonStyles from '../styles/commonStyles';
import { sendUserData } from '../apiCalls/userData';
const Registration = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const handleRegistration = async () => {
    //     try {

    //         await loginWithEmail(email, password);
    //         console.log('Registration successful!');

    //     } catch (error) {
    //         console.error('Registration failed:', error);

    //     }
    // };

    const navigateLogin = () => {
            navigation.navigate('LoginOptions');
        };

    const handleRegistration = async () => {
        try {
            // Check if password and confirm password match
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
    
            const userData = {
                firstName: firstName,
                lastName: lastName,
                emailAddress: email,
                password: password,
                phoneNumber: phone,
                isGuestUser: false // Assuming the user is not a guest user
            };
    
            const response = await sendUserData(userData);

            if (response.status === 201) {
                Alert.alert('Registration successful!');
                navigation.navigate('LoginOptions');
            } else {
                Alert.alert('Failed to register user:', response.statusText);
            }
        } catch (error) {
            Alert.alert('Registration failed:', error.message);
        }
    };
    


    return (
        <KeyboardAvoidingView style={commonStyles.container} behavior="padding">
        <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/login-icons/login-bg.png')}
                style={styles.backgroundImage}
            >

                <Image source={require('../assets/login-icons/logo.png')} style={styles.logo} />

                <View style={styles.inputWrapper}>
                    <Image source={require('../assets/reg-avatar.png')} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="none"
                        textAlignVertical="center"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Image source={require('../assets/reg-avatar.png')} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize="none"
                        textAlignVertical="center"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Image source={require('../assets/login-icons/gmail.png')} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        textAlignVertical="center"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Image source={require('../assets/reg-avatar.png')} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        autoCapitalize="none"
                        textAlignVertical="center"
                    />
                </View>


                <View style={styles.inputWrapper}>
                    <Image source={require('../assets/login-icons/password.png')} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        textAlignVertical="center"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Image source={require('../assets/login-icons/password.png')} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        textAlignVertical="center"
                    />
                </View>


                <TouchableOpacity onPress={handleRegistration} style={styles.signUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>


                <Text style={[styles.buttonText, { color: '#C34F5A', fontWeight: 'bold', paddingVertical: 10 }]}> Or</Text>


                <TouchableOpacity style={styles.signUp}>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../assets/login-icons/google.png')} style={styles.icon} />
                        <Text style={styles.buttonText}>Sign up using Google</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUp}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/login-icons/facebook.png')} style={styles.icon} />
                        <Text style={styles.buttonText}>Sign up using facebook</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={navigateLogin}>
                    <Text style={styles.skipText}>Already has an account? Log in</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 110,
        height: 110,
        marginBottom: 50,
        alignSelf: 'center',
    },
    imageContainer: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    loginOptions: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUp: {
        backgroundColor: '#C34F5A',
        padding: 10,
        marginTop: 20,
        borderRadius: 50,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    skipText: {
        marginTop: 30,
        textDecorationLine: 'underline',
        color: '#C34F5A',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',

    },
    input: {
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 50,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        paddingBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        paddingHorizontal: 20,
        marginTop: 20,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
});

export default Registration;
