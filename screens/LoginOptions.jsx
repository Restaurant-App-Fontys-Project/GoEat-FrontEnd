import React, { useState , useEffect} from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions, ImageBackground, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogin, deleteUser } from '../apiCalls/userData';


const LoginOptions = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); 
    const [userData, setUserData] = useState(null); 
    
    //  clear async storage
        // const clearAsyncStorage = async () => {
        //     try {
        //         await AsyncStorage.clear();
        //         console.log('AsyncStorage cleared successfully.');
        //     } catch (error) {
        //         console.error('Error clearing AsyncStorage:', error);
        //     }
        // };
        // clearAsyncStorage();

        useEffect(() => {
            checkLoginStatus();
        }, []);

    const checkLoginStatus = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            console.log('User ID:', userId);
            if (userId) {
                // User is logged in
                console.log('User is logged in');
                setLoggedIn(true);
                // Retrieve user data from AsyncStorage
                const userDataJSON = await AsyncStorage.getItem('userData');
                console.log('User Data JSON:', userDataJSON);
                if (userDataJSON) {
                    console.log('User data found');
                    setUserData(JSON.parse(userDataJSON));
                } else {
                    console.log('No user data found');
                }
            } else {
                console.log('User ID not found');
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };
    

    const handleLogin = async () => {
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await userLogin(email, password);
            console.log('Login response:', response);
            
            if (response && response.status === 200) {
                const userData = response.data;
                console.log('User data:', userData);
                const userId = userData.id; 
                await AsyncStorage.setItem('userId', userId);
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                setLoggedIn(true);
                setUserData(userData); 
                Alert.alert('Login successful!');
                navigation.navigate('Location');
            } else {
                Alert.alert('Login failed:', 'Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login failed:', 'An error occurred during the login process. Please try again later.');
        }
    };
    
    const handleLogout = async () => {
        try {
            // Clear userId and userData from AsyncStorage
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userData');
            setLoggedIn(false); 
            setUserData(null); 
            Alert.alert('Logout successful!');
        } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Logout failed:', 'An error occurred during the logout process. Please try again later.');
        }
    };

    const handleSkip = () => {
        navigation.navigate('Location');
    };

    const navigateRegister = () => {
        navigation.navigate('Registration');
    };

    const handleLoginWithFacebook = () => {
        // Handle Facebook login
    };

    const handleLoginWithGoogle = () => {
        // Handle Google login
    };

    const handleEditProfile = () => {
        
    };

    const handleDeleteAccount = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            console.log('User ID:', userId);
            if (!userId) {
                Alert.alert('Error', 'User ID not found. Please log in again.');
                return;
            }
    
            Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', onPress: async () => {
                        const response = await deleteUser(userId);
                        console.log('Delete User Response:', response);
                        if (response && response.success) {
                            await AsyncStorage.removeItem('userId');
                            await AsyncStorage.removeItem('userData');
                            setLoggedIn(false);
                            setUserData(null);
                            Alert.alert('Success!', 'Your account has been deleted successfully.');
                            navigation.navigate('Welcome');
                        } else {
                            Alert.alert('Error', 'Failed to delete account. Please try again later.');
                        }
                    }}
                ]
            );
        } catch (error) {
            console.error('Error deleting account:', error);
            Alert.alert('Error', 'An error occurred while deleting your account. Please try again later.');
        }
    };
    
    

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/login-icons/login-bg.png')}
                style={styles.backgroundImage}
            >
                {/* App Logo */}
                <Image source={require('../assets/login-icons/logo.png')} style={styles.logo} />

                {/* Display user info and logout button if logged in */}
                {loggedIn && userData && (
                    <View style={styles.userInfoContainer}>
                        <Text style={[styles.userInfoText, {fontWeight:'bold'}, {fontSize:20}]}>Welcome, {userData.firstName} {userData.lastName}</Text>
                        <View style={styles.userInfoSeparator} />
                        <Text style={styles.userInfoText}>First name: {userData.firstName}</Text>
                        <View style={styles.userInfoSeparator} />
                        <Text style={styles.userInfoText}>Last Name: {userData.lastName}</Text>
                        <View style={styles.userInfoSeparator} />
                        <Text style={styles.userInfoText}>Email: {userData.emailAddress}</Text>
                        <View style={styles.userInfoSeparator} />
                        <Text style={styles.userInfoText}>Phone: {userData.phoneNumber}</Text>
                        <View style={styles.userInfoSeparator} />

                        <View style={styles.deleteButton}>
                        {/* Edit Profile button */}
                            <TouchableOpacity onPress={handleEditProfile} style={styles.edit}>
                                <Text style={[styles.buttonText, {color:'black'}]}>Edit </Text>
                            </TouchableOpacity>

                            {/* Delete Account button */}
                            <TouchableOpacity onPress={handleDeleteAccount} style={styles.delete}>
                                <Text style={[styles.buttonText, {color:'black'}]}>Delete </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Display login form if not logged in */}
                {!loggedIn && (
                    <View>
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

                        {/* Login with Facebook and Google */}
                        <View style={styles.loginOptions}>
                            <TouchableOpacity onPress={handleLoginWithFacebook}>
                                <Image source={require('../assets/login-icons/facebook.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleLoginWithGoogle}>
                                <Image source={require('../assets/login-icons/google.png')} style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        {/* Register */}
                        <TouchableOpacity onPress={navigateRegister}>
                            <Text style={styles.skipText}>New user? Register now</Text>
                        </TouchableOpacity>

                        {/* Skip Option */}
                        <TouchableOpacity onPress={handleSkip}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
    loginButton: {
        backgroundColor: '#C34F5A',
        padding: 10,
        marginTop: 20,
        borderRadius: 50,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
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
    loginOptions: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    userInfoText: {
        fontSize: 18,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#C34F5A',
        padding: 10,
        borderRadius: 50,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 18,
    },
    userInfoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    userInfoSeparator: {
        height: 1,
        backgroundColor: '#CCCCCC',
        width: '80%',
        marginVertical: 10,
    },
    deleteButton: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    edit: {
        backgroundColor: '#F8D3B9',
        padding: 10,
        marginTop: 20,
        borderRadius: 50,
        width: '30%',
        marginLeft: 'auto',
        marginRight: 10,
        justifyContent: 'center',
    },
    delete: {
        backgroundColor: '#F8D3B9',
        padding: 10,
        marginTop: 20,
        borderRadius: 50,
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
    },
});

export default LoginOptions;