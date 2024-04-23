import React from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import GradientButton from '../styles/GradientButton'

const Welcome = ({ navigation }) => {
    
    const handleNavigation = () => {
        navigation.navigate('LoginOptions');
    }

    return (
        <ImageBackground source={require('../assets/background.png')} style={{ height: "100%", width: "100%" }} >
            <View style={styles.container}>
                <Image source={require('../assets/logo1.png')} style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 100 }} />
                <Text style={styles.bigText}>
                    Discover Flavor, {'\n'}Reserve with Ease
                </Text>
                <Text style={styles.smallText}>
                    The perfect Restaurant for any occasion with our advanced search tools.......
                </Text>
                 {/* <LinearGradient
                    colors={['rgba(214, 159, 59, 1)', 'rgba(197, 79, 91, 1)']} 
                    start={{ x: 0, y: 0 }} 
                    end={{ x: 1, y: 0 }}   
                    style={styles.continueButton}
                >
                    <TouchableOpacity onPress={handleNavigation}>
                    <Text style={styles.continueButtonText}>Start</Text>
                    </TouchableOpacity>
                </LinearGradient> */}
                <GradientButton
                    text="Start"
                    onPress={handleNavigation}
                />
            </View>
        </ImageBackground>
    )
}

Welcome.options = {
    headerShown: false,
};

const styles = {
    container: {
        flex: 1,
        margin: 20,
        padding: 10,
    },
    bigText: {
        marginTop: 40,
        fontSize: 42,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left'
    },
    smallText: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'medium',
        color: 'white',
        textAlign: 'left'
    },
    button: {
        marginTop: 10,
        backgroundColor: '#C34F5B',
        padding: 10,
        borderRadius: 20,
        position: 'absolute',
        width: '100%',
        bottom: 20,
    },
    linearGradient: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    continueButton: {
        marginTop: 10,
        padding: 15,
        borderRadius: 50,
        position: 'absolute',
        width: '50%',
        bottom: 20,
        marginHorizontal: 80,
    },
    continueButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
}

export default Welcome
