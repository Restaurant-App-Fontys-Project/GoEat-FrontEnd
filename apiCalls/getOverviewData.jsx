import axios from "axios";

const getOverviewData = async () => {
    try {
        const response = await axios.get("http://localhost:5107/reservation");
        console.log("Overview data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching overview data:", error);
    }
}

const updateOverviewData = async (id,data) => {
    try {
        const response = await axios.put("http://localhost:5107/{id}/overview", data);
        console.log("Overview data updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating overview data:", error);
    }
}

const deleteOverviewData = async (data) => {
    try {
        const response = await axios.delete("http://localhost:5107/{restaurantId}/overview", data);
        console.log("Overview data deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting overview data:", error);
    }
}

export default { getOverviewData, updateOverviewData, deleteOverviewData };
    