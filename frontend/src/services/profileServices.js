// Includes the API for profile page

import api from "./api"

const PROFILE_URL = "/profile";

export const getProfile = async () => {
    const response = await api.get(PROFILE_URL);
    return response.data;
}

export const updateProfile = async (profileData) => {
    const response = await api.put(PROFILE_URL, profileData);
    return response.data;
}

export const getProfileOptions = async () => {
    const response = await api.get(
        `${PROFILE_URL}/options`
    );
    console.log(response.data);
    return response.data;
}
