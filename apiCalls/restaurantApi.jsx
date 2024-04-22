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
        const menuResponse = await axios.get(`https://goeat-api.onrender.com/restaurants/meals/${restaurantId}`);
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

    // Fetch meals by restaurant id {id}
    export const fetchMeals = async (id) => {
        try {
            const menuResponse = await axios.get(`https://goeat-api.onrender.com/restaurants/meals/${id}`);
            const menuData = menuResponse.data;

            return menuData;
        } catch (error) {
            console.error('Error fetching meals: ' + `https://goeat-api.onrender.com/restaurants/meals/${id}`, error);
            return null;
        }
    }

    // fetch all meals
    export const fetchAllMeals = async () => {
        try {
            const meals = await axios.get('https://goeat-api.onrender.com/meals');
            return meals.data;
        } catch (error) {
            console.error('Error fetching meals:', error);
            return [];
        }
    }
    
    // fetch meals based on location
    export const fetchMealsByLocation = async (city) => {
        try {
            const response = await axios.get(`https://goeat-api.onrender.com/meals`);
            const allMeals = response.data;
            // Filter meals by city
            const mealsInCity = allMeals.filter(meal => meal.city === city) 
            return mealsInCity;
        } catch (error) {
            console.error('Error fetching meals by city:', error);
            return [];
        }
    }

    // fetch all tags
    export const fetchTags = async () => {
        try {
            const tags = await axios.get('https://goeat-api.onrender.com/mealtags');
            return tags.data;
        } catch (error) {
            console.error('Error fetching tags:', error);
            return [];
        }
    }

    export const fetchRestaurantTags = async (restaurantId) => {
        try {
            const tags = await axios.get(`https://goeat-api.onrender.com/restaurants/mealtags/${restaurantId}`);
            return tags.data;
        } catch (error) {
            console.error('Error fetching restaurant tags:', error);
            return [];
        }
    }