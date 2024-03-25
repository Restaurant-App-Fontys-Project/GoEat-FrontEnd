import axios from 'axios';
// restaurant name
// reservation_max_duration_in_hours,
// conditions_of_reservation(message),
// opening_time_of_special_day,
// closing_time_of_special_day,
// opening_time_of_Sunday,
// ….
// opening_time_of_Saturday,
// …
// closing_time_of_Sunday,
// …
// closing_time_of_Saturday,
// tables[
// tableId,
// tableNumber,
// x_coordinate*,
// y_coordinate*,
// height*,
// width*,
// image or svgPath (identifier)* , (This is for representing the table)
// number of seats,
// availability,]


// const getReservationData = async () => {
//     try {
//         // Validate restaurantId if needed
//         if (typeof restaurantId !== 'string' || !restaurantId.trim()) {
//             throw new Error('Invalid restaurantId');
//         }

//         const response = await axios.get(`https://goeat-api.onrender.com/reservations/${restaurantId}`);
//         console.log('Fetched reservation data:', response.data);

//         if (response.status !== 200) {
//             throw new Error('Failed to fetch reservation data');
//         }

//         return response.data;
//     } catch (error) {
//         console.error('Error fetching reservation data:', error);
//         throw error;
//     }
// };

// export default getReservationData;
