import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, Dimensions, Alert, ImageBackground, TextInput } from 'react-native';
import commonStyles from '../styles/commonStyles';
import { sendUserData } from '../apiCalls/userData';
import GradientButton from '../styles/GradientButton';
const Registration = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const navigateLogin = () => {
            navigation.navigate('LoginOptions');
        };

    const handleRegistration = async () => {
        try {
                // Check if required fields are filled
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                throw new Error("Please fill in all required fields");
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Please enter a valid email address");
            }

            // Validate password strength
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }
            // Check if password and confirm password match
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            // Check if phone number is valid
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                throw new Error("Please enter a valid phone number");
            }
                
            const userData = {
                firstName: firstName,
                lastName: lastName,
                emailAddress: email,
                password: password,
                phoneNumber: phone,
                isGuestUser: false 
            };
    
            const response = await sendUserData(userData);

            if (response.status === 201) {
                Alert.alert('Registration successful!');
                navigation.navigate('LoginOptions');
            } else {
                Alert.alert('Failed to register user:', response.statusText);
            }
        } catch (error) {
            if (error.message === "Email already exists") {
                Alert.alert('Registration failed!', 'Email already exists. Please use a different email address.');
            } else {
                Alert.alert('Registration failed:', 'Failed to send user data. Please try again later.');
            }
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

                <Image source={require('../assets/logoGE.png')} style={styles.logo} />

                <View style={styles.inputWrapper}>
                    <Image source={require('../assets/login-icons/profile.png')} style={styles.icon} />
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
                    <Image source={require('../assets/login-icons/profile.png')} style={styles.icon} />
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
                    <Image source={require('../assets/login-icons/phone.png')} style={styles.icon} />
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
                    <Image source={require('../assets/login-icons/confirmP.png')} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        textAlignVertical="center"
                    />
                </View>

                <GradientButton text="Sign Up" onPress={handleRegistration} />

                <TouchableOpacity
                    onPress={navigateLogin}>
                    <Text style={styles.skipText}>Already has an account? Login</Text>
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
        marginBottom: 50,
        alignSelf: 'center',
        marginTop: 50,
        width: 110,
        height: 110,
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
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
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
        height: 25,
        width: 25,
        marginRight: 10,
    },
    skipText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: 'white',
        textDecorationLine: 'underline',
        marginBottom: 50,
    },
});

export default Registration;
