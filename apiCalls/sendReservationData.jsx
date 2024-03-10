import axios from 'axios';

const sendReservationData = async (data, navigation) => {
    // const data = {
    //     numberOfGuests,
    //     firstName,
    //     lastName,
    //     email,
    //     phoneNumber,
    //     specialNotes,
    //     selectedDate,
    //     selectedTimeSlot
    //   };
    try {
        const response = await axios.post('http://localhost:5107/{restaurantId}/reservation', data);
        console.log("Reservation created:", response.data);
        alert('Reservation confirmed!');
        // direct to the reservation overview page
        navigation.navigate('ReservationOverview');
    } catch (error) {
        console.error("Error creating reservation:", error);
    }
    }
export default sendReservationData;