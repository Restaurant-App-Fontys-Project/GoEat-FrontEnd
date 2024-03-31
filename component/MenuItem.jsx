import { useEffect, useState } from "react";
import { fetchMealImage } from "../apiCalls/restaurantApi";
import { View, Image, Text, StyleSheet, Dimensions} from "react-native";

const MenuItem = ({ index, item, isLast }) => {
    const [menuImage, setMenuImage] = useState(null);

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

    //check if the meal image and menuItem data are fetched
    if (!menuImage || !item) {
        return <Text>Loading...</Text>;
    }

    return (
        <View key={item.id} style={[styles.menuItemContainer, isLast && styles.lastMenuItem]}>
                    <Image source={{ uri: menuImage}} style={styles.imageItem} />
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemDescription}>{item.description}</Text>
                    </View>
                    <Text style={styles.menuItemPrice}>${item.price}</Text>
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
        marginBottom: 10,
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
        marginTop: 5,
        textAlign: 'justify',
    },
    menuItemPrice: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default MenuItem;
