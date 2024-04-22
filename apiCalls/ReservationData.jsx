import axios from 'axios'; 

export const getRestaurantData = async (restaurantId) => {
    try {
        const response = await axios.get(`https://goeat-api.onrender.com/restaurants/${restaurantId}`);
        const restaurantData = response.data;
        console.log('Restaurant data:', restaurantData);
        return restaurantData;

    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        return [];
    }
}

export const getReservationData = async (restaurantId) => {
    try {
        const response = await axios.get(`https://goeat-api.onrender.com/restaurants/${restaurantId}/reservations`);
        const reservationData = response.data;

        return reservationData;
    } catch (error) {
        console.error('Error fetching reservation data:', error);
        return [];
    }
}
export const getTableData = async (restaurantId) => {
    try {
        const response = await axios.get(`https://goeat-api.onrender.com/tables/Restaurant/${restaurantId}`);
        const tableData = response.data;

        return tableData;
    } catch (error) {
        console.error('Error fetching table data:', error);
        return [];
    }
}

export const sendReservationData = async (data, timeout) => {
    try {
        const response = await axios.post('https://goeat-api.onrender.com/reservations', data);
        timeout = timeout;
        return response;
    } catch (error) {
        console.error('Error sending reservation data:', error);
        return error;
    }
}

export const getReservationsByDate = async (restaurantId, date) => {
    try {
        const response = await axios.get(`https://goeat-api.onrender.com/reservations/${restaurantId}/${date}`);
        const reservationData = response.data;

        return reservationData;
    } catch (error) {
        console.error('Error fetching reservation data:', error);
        return [];
    }
}
