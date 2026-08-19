import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";
import { generateInterviewReport, getReportHistory, getReportById } from "../services/interview.api.js";

export const useInterview = () => {
    const { reports, setReports, currentReport, setCurrentReport, loading, setLoading } =
        useContext(InterviewContext);

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

    return {
        reports,
        currentReport,
        loading,
        generateReport,
        fetchHistory,
        fetchReportById,
    };
};