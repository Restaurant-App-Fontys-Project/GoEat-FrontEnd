import axios from 'axios';

export const fetchRestaurantData = async (setRestaurantData) => {
    try {
        // Fetch cover picture data
        /* const coverResponse = await axios.get('https://...');
        const coverData = coverResponse.data; */

        // Fetch details data
        const detailsResponse = await axios.get('https://goeat-api.onrender.com/Restaurants/%7Bd98f766e-a7b6-4fa3-a7be-63046e3f3c6f%7D');
        const detailsData = detailsResponse.data;

        // Fetch menu data
        /* const menuResponse = await axios.get('https://...');
        const menuData = menuResponse.data; */

        // Set the fetched data into state
        setRestaurantData({
            /* cover: coverData, */
            details: detailsData,
            /* menu: menuData */
        });

        console.log('Fetched data:',/* , coverData, */ detailsData/* , menuData */);
    } catch (error) {
        console.error(error);
    }
};