import axios from 'axios';

export const fetchRestaurantData = async (setRestaurantData) => {
    try {
        // Fetch cover picture data
        /* const coverResponse = await axios.get('https://...');
        const coverData = coverResponse.data; */

        // Fetch details data
        const detailsResponse = await axios.get('https://goeat-api.onrender.com/api/Restaurant/0051291c-c8cb-4883-adac-6657a3815330');
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