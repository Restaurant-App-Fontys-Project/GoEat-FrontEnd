import axios from "axios";

const BASE_URL = 'https://goeat-api.onrender.com/'

const getOverviewList = async () => {
    // https://goeat-api.onrender.com/reservations/userid?userId=d19b78e7-e6c8-43f6-b897-d9dba662b2fe
    try {
        const response = await axios.get(BASE_URL+'userid?userId={userId}');
        console.log("Overview data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching overview data:", error);
    }
}

const getRestaurantName = async (id) => {
    try {
        const response = await axios.get(BASE_URL + `api/restaurant/${id}`);
        data = response.data;
        return data.name;
    } catch (error) {
        console.error("Error fetching restaurant name:", error);
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

const deleteOverviewData = async (id) => {
    try {
        const response = await axios.delete(BASE_URL+'reservations/' + id);
        console.log("Overview data deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting overview data:", error);
    }
}


export { getOverviewList, getRestaurantName, updateOverviewData, deleteOverviewData };