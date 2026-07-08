// Includes authentication service for login, register and get current user

import api from "./api"

const API_URL = "/auth";

export const registerUser = async(userData) => {
    const response = await api.post(
        `${API_URL}/register`,
        userData
    );
    return response.data;
}

export const loginUser = async(loginData) => {
    const response = await api.post(
        `${API_URL}/login`,
        loginData
    );
    return response.data;
}

export const getCurrentUser = async(token) => {
    const response = await api.get(
        `${API_URL}/user`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};