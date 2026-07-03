import axios from "axios";

const API_URL = "http://localhost:8000/app/fitness/auth";

export const registerUser = async(userData) => {
    const response = await axios.post(
        `${API_URL}/register`,
        userData
    );
    return response.data;
}

export const loginUser = async(loginData) => {
    const response = await axios.post(
        `${API_URL}/login`,
        loginData
    );
    return response.data;
}

export const getCurrentUser = async(token) => {
    const response = await axios.get(
        `${API_URL}/user`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};