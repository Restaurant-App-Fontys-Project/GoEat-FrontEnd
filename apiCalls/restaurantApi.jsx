import axios from 'axios';

export const fetchRestaurantData = async (setRestaurantData) => {
    try {
        // Fetch cover picture data
        /* const coverResponse = await axios.get('https://goeat-api.onrender.com/restaurants/b7ac5e6a-45f0-47a9-9f30-197ebeee50f1/cover_picture');
        const coverData = coverResponse.data; */

        // Fetch details data
        const detailsResponse = await axios.get('https://goeat-api.onrender.com/restaurants/b7ac5e6a-45f0-47a9-9f30-197ebeee50f1');
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
        // Log cover image data
       /*  console.log('Cover image data:', coverData); */

        console.log('Fetched data:', /* coverData, */ detailsData/* , menuData */);
    } catch (error) {
        console.error(error);
    }
};