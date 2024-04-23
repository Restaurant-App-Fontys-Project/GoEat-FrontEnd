import React, { useEffect, useRef } from 'react';
import { View,ImageBackground, Animated, Easing } from 'react-native';

const Welcome = ({ navigation }) => {
    const logoScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(logoScale, {
            toValue: 1,
            duration: 2500, 
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            navigation.navigate('LoginOptions');
        });
    }, []);

    return (
        <ImageBackground source={require('../assets/background.png')} style={{ height: "100%", width: "100%" }}>
            <View style={styles.container}>
                <Animated.Image
                    source={require('../assets/logoGE.png')}
                    style={{
                        width: 200,
                        height: 200,
                        alignSelf: 'center',
                        marginTop: 100,
                        transform: [{ scale: logoScale }],
                    }}
                />
            </View>
        </ImageBackground>
    );
};

Welcome.options = {
    headerShown: false,
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default Welcome;
