import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";
import {
    generateInterviewReport,
    getReportHistory,
    getReportById,
    generateResume,
} from "../services/interview.api.js";

export const useInterview = () => {
    const {
        reports, setReports,
        currentReport, setCurrentReport,
        loading, setLoading,
        resumeLoading, setResumeLoading,
    } = useContext(InterviewContext);

    const generateReport = async ({ resume, jobDescription, selfDescription }) => {
        setLoading(true);
        try {
            const data = await generateInterviewReport({ resume, jobDescription, selfDescription });
            setCurrentReport(data.report);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await getReportHistory();
            setReports(data.reports);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const fetchReportById = async (id) => {
        setLoading(true);
        try {
            const data = await getReportById(id);
            setCurrentReport(data.report);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const downloadResume = async ({ resume, jobDescription, selfDescription }) => {
        setResumeLoading(true);
        try {
            const pdfBlob = await generateResume({ resume, jobDescription, selfDescription });

            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "tailored-resume.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } finally {
            setResumeLoading(false);
        }
    };

    return {
        reports,
        currentReport,
        loading,
        resumeLoading,
        generateReport,
        fetchHistory,
        fetchReportById,
        downloadResume,
    };
};