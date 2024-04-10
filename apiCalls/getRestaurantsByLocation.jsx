import axios from 'axios'; 

export const getRestaurantsByLocation = async (city) => {
    try {
        const response = await axios.get(`https://goeat-api.onrender.com/restaurants`);
        const allRestaurants = response.data;
        // Filter restaurants by city
        const restaurantsInCity = allRestaurants.filter(restaurant => restaurant.city === city) 
        return restaurantsInCity;
    } catch (error) {
        console.error('Error fetching restaurants by city:', error);
        return [];
    }
};
