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