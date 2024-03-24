import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import SmoothImageTransition from '../component/SmoothImageTransition';
import commonStyles from '../styles/commonStyles';

const LoginOptions = ({ navigation }) => {
    const handleSkip = () => {
        // Navigate to the home screen
        navigation.navigate('Restaurant');
    };

    const handleLoginWithFacebook = () => {
        // Handle Facebook login
    };

    const handleLoginWithGoogle = () => {
        // Handle Google login
    };

    const handleLoginWithEmail = () => {
        // Handle email login
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
            {/* App Logo */}
            <Image source={require('../assets/logo.png')} style={styles.logo} />

            {/* Image Carousel */}
            <View style={styles.imageContainer}>
                <SmoothImageTransition images={images} />
            </View>

            {/* Login Options */}
            <View style={styles.loginOptions}>
                <TouchableOpacity onPress={handleLoginWithFacebook} style={styles.loginButton}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/login-icons/facebook.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                        <Text style={styles.buttonText}>Login with Facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLoginWithGoogle} style={styles.loginButton}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/login-icons/google.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                        <Text style={styles.buttonText}>Login with Google</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLoginWithEmail} style={styles.loginButton}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/login-icons/gmail.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                        <Text style={styles.buttonText}>Login with Email</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Skip Option */}
            <TouchableOpacity 
            onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, 
    },
    logo: {
        width: 250, 
        height: 100, 
        marginBottom: 50, 
    },
    imageContainer: {
        width: Dimensions.get('window').width, 
        height: 200, 
    },
    loginOptions: {
        marginTop: 20,
    },
    loginButton: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        marginTop: 20,
        borderRadius: 50
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
    },
    skipText: {
        marginTop: 20,
        textDecorationLine: 'underline',
        color: '#C34F5A',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default LoginOptions;
