import axios from 'axios'; 
// POST user data to the server
export const sendUserData = async (data) => {
    try {
        const response = await axios.post('https://goeat-api.onrender.com/users', data);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('Email already exists');
        } else {
            console.error('Error sending user data:', error);
            throw new Error('Failed to send user data');
        }
    }
}
// user login
export const userLogin = async (email, password) => {
    try {
        const response = await axios.post('https://goeat-api.onrender.com/users/login', {
            emailAddress: email,
            password: password
        });
        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        console.error('Error logging in:', error);
        return {
            status: error.response ? error.response.status : 500, 
            error: error.message 
        };
    }
}

// fetch user data
export const fetchUserData = async (userId) => {
    try {
        const response = await axios.get(`https://goeat-api.onrender.com/users/${userId}`);
        const userData = response.data;
        return userData;

    } catch (error) {
        console.error('Error fetching user data:', error);
        return error;
    }
}

// delete user data
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`https://goeat-api.onrender.com/users/${userId}`);
        if (response.status === 204) {
            return { success: true }; 
        } else {
            throw new Error(`Failed to delete user data. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting user data:', error);
        throw error;
    }
}
