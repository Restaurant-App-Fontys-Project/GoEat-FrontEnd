import axios from 'axios';
global.Buffer = global.Buffer || require('buffer').Buffer;

export const fetchRestaurantData = async (restaurantId, setRestaurantData) => {

    // const restaurantId = '0051291c-c8cb-4883-adac-6657a3815330'; // Replace with the selected restaurant ID
    console.log('Restaurant ID:', restaurantId);

    try {
        // Fetch cover picture data
        const coverData = await axios.get(`https://goeat-api.onrender.com/restaurants/${restaurantId}/cover_picture`, {
            responseType: 'arraybuffer'
          })
          .then(response => Buffer.from(response.data, 'binary').toString('base64'))
          .then(data => `data:image/jpeg;base64,${data}`);

        // Fetch details data
        const detailsResponse = await axios.get(`https://goeat-api.onrender.com/restaurants/${restaurantId}`);
        const detailsData = detailsResponse.data;

        // Fetch menu data
        const menuResponse = await axios.get('https://goeat-api.onrender.com/restaurants/meals/b7ac5e6a-45f0-47a9-9f30-197ebeee50f1/');
        const menuData = menuResponse.data;

        // Set the fetched data into state
        setRestaurantData({
            cover: coverData,
            details: detailsData,
            menu: menuData,
        });
    } catch (error) {
        console.error(error);
    }
};

    // Fetch meal image by meal id {id}
    export const fetchMealImage = async (id) => {
        try {
            const mealImage = await axios.get(`https://goeat-api.onrender.com/meals/${id}/meal_image`, {
                responseType: 'arraybuffer'
              })
              .then(response => Buffer.from(response.data, 'binary').toString('base64'))
              .then(data => `data:image/jpeg;base64,${data}`);

            return mealImage;
        } catch (error) {
            console.error('Error fetching meal image:', error);
            return null;
        }
    }