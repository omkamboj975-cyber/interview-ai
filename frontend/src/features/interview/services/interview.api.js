import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8008"}/api/interview`;

export const generateInterviewReport = async ({ resume, jobDescription, selfDescription }) => {
    const formData = new FormData();
    if (resume) {
        formData.append("resume", resume);
    }
    formData.append("jobDescription", jobDescription);
    if (selfDescription) {
        formData.append("selfDescription", selfDescription);
    }

    const response = await axios.post(`${BASE_URL}/generate`, formData, {
        withCredentials: true,
    });

    return response.data;
};

export const getReportHistory = async () => {
    const response = await axios.get(`${BASE_URL}/history`, {
        withCredentials: true,
    });

    return response.data;
};

export const getReportById = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`, {
        withCredentials: true,
    });

    return response.data;
};

export const generateResume = async ({ resume, jobDescription, selfDescription }) => {
    const formData = new FormData();
    if (resume) {
        formData.append("resume", resume);
    }
    formData.append("jobDescription", jobDescription);
    if (selfDescription) {
        formData.append("selfDescription", selfDescription);
    }

    const response = await axios.post(`${BASE_URL}/generate-resume`, formData, {
        withCredentials: true,
        responseType: "blob",
    });

    return response.data;
};