import axios from "axios";

const BASE_URL = "http://localhost:8008/api/interview";

export const generateInterviewReport = async ({ resume, jobDescription, selfDescription }) => {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);
    if (selfDescription) {
        formData.append("selfDescription", selfDescription);
    }

    const response = await axios.post(`${BASE_URL}/generate`, formData, {
        withCredentials: true,
    });

    return response.data;
};