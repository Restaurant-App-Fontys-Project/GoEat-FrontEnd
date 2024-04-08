import axios from 'axios'; 

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
    } catch (error) {
        console.error('Error sending reservation data:', error);
        return error;
    }
}