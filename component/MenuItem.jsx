import { useEffect, useState } from "react";
import { fetchMealImage } from "../apiCalls/restaurantApi";
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 


const MenuItem = ({ index, item, isLast }) => {
    const [menuImage, setMenuImage] = useState(null);
    const [showFullText, setShowFullText] = useState(false);

    const getMealImage = async (id) => {
        try {
            const mealImage = await fetchMealImage(id);
            setMenuImage(mealImage);
        } catch (error) {
            console.error('Error fetching meal image:', error);
        }
    };

    useEffect(() => {
        getMealImage(item.id);
    }, []);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    //check if the meal image and menuItem data are fetched
    if (!menuImage || !item) {
        return <Text>Loading...</Text>;
    }

    return (
        <View key={item.id} style={[styles.menuItemContainer, isLast && styles.lastMenuItem]}>
            <Image source={{ uri: menuImage}} style={styles.imageItem} />
            <View style={styles.menuItem}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={[styles.menuItemDescription, stlyes={fontWeight: 'bold'}]}>Tags</Text>
                <Text style={styles.menuItemDescription}>Vegan, Gluten-free</Text>
                <TouchableOpacity onPress={toggleShowFullText} style={styles.arrowButton}>
                    <MaterialIcons name={showFullText ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={22} color="black" />
                </TouchableOpacity>
                {showFullText && (
                    <>
                        <Text style={[styles.menuItemDescription, stlyes={fontWeight: 'bold'}]}>Ingredients</Text>
                        <Text style={styles.menuItemDescription}>{item.ingredients}</Text>
                        <Text style={[styles.menuItemDescription, stlyes={fontWeight: 'bold'}]}>Description</Text>
                        <Text style={styles.menuItemDescription}>{item.description}</Text>
                    </>
                )}
            </View>
            <Text style={styles.menuItemPrice}>{item.price}€</Text>
        </View>
    );
};

const { width } = Dimensions.get('window');
const imageWidth = width * 0.2;
const containerWidth = width * 0.9;

const styles = StyleSheet.create({
    menu: {
        width: containerWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom: 10,
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    imageItem: {
        width: imageWidth,
        height: imageWidth,
        marginRight: 10,
        borderRadius: 5,
    },
    menuItem: {
        flex: 1,
        marginRight: 20,
    },
    lastMenuItem: {
        marginRight: 10,
    },
    menuItemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuItemDescription: {
        fontSize: 16,
        marginTop: 3,
        textAlign: 'justify',
    },
    menuItemPrice: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold',
    },
});

export default MenuItem;
