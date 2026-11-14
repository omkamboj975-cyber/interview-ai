import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8008"}/api/auth`;

export const register = async ({ name, email, password }) => {
    const response = await axios.post(`${BASE_URL}/register`,
        { name, email, password },
        { withCredentials: true }
    );
    return response.data;
}

export const login = async ({ email, password }) => {
    const response = await axios.post(`${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
    );
    return response.data;
}

export const logout = async () => {
    const response = await axios.post(`${BASE_URL}/logout`,
        {},
        { withCredentials: true }
    );
    return response.data;
}

export const getMe = async () => {
    const response = await axios.get(`${BASE_URL}/get-me`,
        { withCredentials: true }
    );
    return response.data;
}