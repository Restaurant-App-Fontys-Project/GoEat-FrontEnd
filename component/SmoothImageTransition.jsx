import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';

const SmoothImageTransition = ({ images }) => {
    const translation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const moveImages = () => {
            Animated.timing(translation, {
                toValue: -Dimensions.get('window').width * images.length,
                duration: 10000, 
                useNativeDriver: true,
            }).start(() => {
                // Reset translation value
                translation.setValue(0);
                // Call moveImages again for continuous movement
                moveImages();
            });
        };

        moveImages();

        return () => {
            // Stop animation when component unmounts
            translation.stopAnimation();
        };
    }, [images.length, translation]);

    return (
        <View style={styles.container}>
            {images.map((image, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.imageContainer,
                        {
                            width: Dimensions.get('window').width, 
                            transform: [{ translateX: Animated.add(translation, index * Dimensions.get('window').width) }],
                        },
                    ]}
                >
                    <Image source={image} style={styles.image} />
                </Animated.View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 150, 
    },
    imageContainer: {
        width: Dimensions.get('window').width,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', 
    },
});

export default SmoothImageTransition;
