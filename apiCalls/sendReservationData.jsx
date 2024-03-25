// import axios from 'axios';

// const sendReservationData = async (data, navigation) => {
//     // const data = {
//     //      restaurantId,
//     //      title,
//     //     firstName,
//     //     lastName,
//     //     email,
//     //     phoneNumber,
//     //     specialNotes,
//     //     date,
//     //     timeSlot(start time),
//     //     duration(hrs),
//     //    numberOfGuests,
//     //    tableId
//     //   };
//     try {
//         const response = await axios.post(`https://goeat-api.onrender.com/reservations`, data);
//         console.log("Reservation created:", response.data);
//         alert('Reservation confirmed!');
//         // direct to the reservation overview page
//         navigation.navigate('ReservationOverview');
//     } catch (error) {
//         console.error("Error creating reservation:", error);
//     }
//     }
// export default sendReservationData;