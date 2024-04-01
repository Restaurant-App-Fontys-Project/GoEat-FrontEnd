import React, {useState} from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions, ImageBackground, TextInput } from 'react-native';
import SmoothImageTransition from '../component/SmoothImageTransition';
import commonStyles from '../styles/commonStyles';

const LoginOptions = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Perform login operation with email and password
            await loginWithEmail(email, password);
            console.log('Login successful!');
            // Add navigation logic or other actions upon successful login
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure, display error message or take appropriate action
        }
    };
    const handleSkip = () => {
        // Navigate to the home screen
        navigation.navigate('Location');
    };

    const handleRegister = () => {
        // Navigate to the registration screen
        navigation.navigate('Register');
    };

    const handleLoginWithFacebook = () => {
        // Handle Facebook login
    };

    const handleLoginWithGoogle = () => {
        // Handle Google login
    };

    const images = [
        require('../assets/login-icons/salad.png'),
        require('../assets/login-icons/spagetti.png'),
        require('../assets/login-icons/fruit.png'),
        require('../assets/login-icons/drink.png'),
        require('../assets/login-icons/drink.png'),
        require('../assets/login-icons/spagetti.png'),
    ];

    return (
        <View style={styles.container}>
            <ImageBackground
            source={require('../assets/login-icons/login-bg.png')}
            style={styles.backgroundImage}
            >
            {/* App Logo */}
            <Image source={require('../assets/login-icons/logo.png')} style={styles.logo} />

            {/* Image Carousel */}
            {/* <View style={styles.imageContainer}>
                <SmoothImageTransition images={images} />
            </View> */}

            {/* Email input */}
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

                {/* Password input */}
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

                {/* Login button */}
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* Forgot password? */}
            <TouchableOpacity>
                <Text style={[styles.buttonText, { color: '#C34F5A', fontWeight: 'bold', marginTop: 30 }]}>Forgot password?</Text>
            </TouchableOpacity>
            <Text style={[styles.buttonText, { color: '#C34F5A', fontWeight: 'bold' }]}> Or</Text>
            {/* Login with Facebook */}
            <View style={styles.loginOptions}>
                <TouchableOpacity onPress={handleLoginWithFacebook}>
                    <Image source={require('../assets/login-icons/facebook.png')} style={styles.icon} />
                </TouchableOpacity>
                {/* Login with Google */}
                <TouchableOpacity onPress={handleLoginWithGoogle}>
                    <Image source={require('../assets/login-icons/google.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
            onPress={handleRegister}>
                <Text style={styles.skipText}>New user? Register now</Text>
            </TouchableOpacity>

            {/* Skip Option */}
            <TouchableOpacity 
            onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
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
    loginButton: {
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

export default LoginOptions;
