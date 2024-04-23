import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton = ({ text, onPress, icon }) => {
    return (
        <LinearGradient
            colors={['rgba(214, 159, 59, 1)', 'rgba(197, 79, 91, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
        >
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <View style={styles.buttonContent}>
{/*                     <Image source={icon} style={styles.icon} /> */}
                    <Text style={styles.buttonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        borderRadius: 50,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
    },
    button: {
        padding: 10,
        borderRadius: 50,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default GradientButton;
