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
        const menuResponse = await axios.get(`https://goeat-api.onrender.com/menus/b7ac5e6a-45f0-47a9-9f30-197ebeee50f1`);
        const menuData = menuResponse.data;

        // Set the fetched data into state
        setRestaurantData({
            cover: coverData,
            details: detailsData,
            menu: menuData,
        });

        // console.log('Fetched data:', /* coverData, */ detailsData, menuData);
    } catch (error) {
        console.error(error);
    }

    
    // Fetch meal image by meal id {id}
    const fetchMealImage = async (id) => {
        try {
            const response = await axios.get('https://goeat-api.onrender.com/meals/51e85eb9-1f34-44f8-a25a-e7660c0b735c/meal_image', {
                responseType: 'arraybuffer'
              })
              .then(response => Buffer.from(response.data, 'binary').toString('base64'))
              .then(data => `data:image/jpeg;base64,${data}`);
        } catch (error) {
            console.error('Error fetching meal image:', error);
            return null;
        }
    }

        // uncomment the following code when the backend is ready

    // const fetchData = async (restaurantId) => {
    //     try {
    //       const response = await axios.get(`https://goeat-api.onrender.com/api/Restaurant/${restaurantId}`);
    //       setRestaurantData(response.data);
    //       console.log('Fetched data:', response.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    // to send restaurant id to the next screen (call this function in the button onPress event)
    // const handleReservation = () => {
    //     navigation.navigate('DateTimePicker', {restaurantId});
    // };
};
/* export const fetchCoverImage = async (restaurantId) => {
    try {
        const response = await axios.get('https://goeat-api.onrender.com/restaurants/b7ac5e6a-45f0-47a9-9f30-197ebeee50f1/cover_picture');
        return response.data;
    } catch (error) {
        console.error('Error fetching cover image:', error);
        return null;
    }
}; */