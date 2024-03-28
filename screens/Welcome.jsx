import React from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'

const Welcome = ({ navigation }) => {
    
    const handleNavigation = () => {
        navigation.navigate('Location');
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
                <TouchableOpacity style={styles.button} onPress={handleNavigation}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
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
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
}

export default Welcome