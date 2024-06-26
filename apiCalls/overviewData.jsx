import axios from "axios";

const BASE_URL = 'https://goeat-api.onrender.com/'

const getOverviewList = async (userId) => {
    try {
        const response = await axios.get(BASE_URL+'reservations/user/' + userId);
        return response.data;
    } catch (error) {
        console.error("Error fetching overview data:", error);
    }
}

const getRestaurantName = async (id) => {
    try {
        const response = await axios.get(BASE_URL + `restaurants/${id}`);
        data = response.data;
        return data.name;
    } catch (error) {
        console.error("Error fetching restaurant name:", error);
    }
}

const getReservation = async (id) => {
    try {
        const response = await axios.get(BASE_URL+`reservations/${id}`);
        console.log("Reservation data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching Reservation data:", error);
    }
}

const updateOverviewData = async (id, data) => {
    try {
        const response = await axios.put("http://localhost:5107/{id}/overview", data);
        console.log("Overview data updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating overview data:", error);
    }
}

const getRestaurantData = async (id) => {
    try {
        const response = await axios.get(BASE_URL + `restaurants/${id}`);
        data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching restaurant data:", error);
    }
}

const deleteOverviewData = async (id) => {
    console.log('At delete' + BASE_URL+'reservations/' + id);
    try {
        const response = await axios.delete(BASE_URL+'reservations/' + id);
        console.log("Overview data deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting overview data:", error);
    }
}


export { getOverviewList, getRestaurantName, getRestaurantData, getReservation, updateOverviewData, deleteOverviewData };