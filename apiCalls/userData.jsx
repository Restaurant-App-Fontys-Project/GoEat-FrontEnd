import axios from 'axios'; 
// POST user data to the server
export const sendUserData = async (data) => {
    try {
        const response = await axios.post('https://goeat-api.onrender.com/users', data);
        return response;
    } catch (error) {
        console.error('Error sending user data:', error);
        return error;
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


